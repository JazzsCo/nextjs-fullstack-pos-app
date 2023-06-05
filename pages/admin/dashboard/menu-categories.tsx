import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import MenuCatSelect from "@/components/MenuCatSelect";
import LocationsSelect from "@/components/LocationsSelect";
import { menu_cats as MenuCategory } from "@prisma/client";

export default function MenuCategories() {
  // const { fetchData } = useContext(AppContext);

  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>();

  const [menuCat, setMenuCat] = useState({
    name: "",
    locationIds: [],
  });

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setMenuCat({ ...menuCat, locationIds: childStateSelectedLocationIds });
  };
  const locationId = localStorage.getItem("locationId");

  const getDataByLocationId = async (id: number) => {
    const url = `/api/getAllData?id=${id}`;

    const res = await axios.get(url);

    console.log("get data by location id : ", res);

    const { menuCategories, addonCategories } = res.data;

    setMenuCategories(menuCategories);
  };

  const handleSubmit = async () => {
    const url = `/api/menuCategories`;

    const res = await axios.post(url, {
      menuCat,
    });

    setMenuCat({
      name: "",
      locationIds: [],
    });

    getDataByLocationId(Number(locationId));
  };

  useEffect(() => {
    getDataByLocationId(Number(locationId));
  }, [locationId]);

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
          marginY: 15,
        }}
      >
        <TextField
          id="standard-basic"
          label="Menu Category Name"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          value={menuCat.name}
          focused
          onChange={(e) => setMenuCat({ ...menuCat, name: e.target.value })}
        />
        <LocationsSelect onStateChange={locationStateChange} />
        <Button onClick={handleSubmit} variant="outlined">
          Create Menu Category
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <MenuCatSelect menuCategories={menuCategories} />
      </Box>
    </Layout>
  );
}
