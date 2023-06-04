import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "@/components/Layout";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import MenuCatSelect from "@/components/MenuCatSelect";
import LocationsSelect from "@/components/LocationsSelect";

export default function MenuCategories() {
  const { fetchData, menuCategories } = useContext(AppContext);

  const [menuCat, setMenuCat] = useState({
    name: "",
    locationIds: [],
  });

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setMenuCat({ ...menuCat, locationIds: childStateSelectedLocationIds });
  };

  const url = `/api/menuCategories`;

  const handleSubmit = async () => {
    const res = await axios.post(url, {
      menuCat,
    });

    setMenuCat({
      name: "",
      locationIds: [],
    });
    fetchData();
  };

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
          value={name}
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
        <MenuCatSelect />
      </Box>
    </Layout>
  );
}
