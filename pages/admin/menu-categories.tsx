import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import MenuCatSelect from "@/components/MenuCatSelect";
import LocationsSelect from "@/components/LocationsSelect";
import {
  menu_cats as MenuCategory,
  menu_cats,
  menus_menu_cats_locations,
} from "@prisma/client";
import { LocationId } from "@/libs/locationId";

export default function MenuCategories() {
  const locationId = Number(LocationId());

  const { fetchData, menuCategories, menusMenuCatAddonCatLocation, ...data } =
    useContext(AppContext);

  const menuCatId = menusMenuCatAddonCatLocation
    .filter(
      (item: menus_menu_cats_locations) => item.location_id === locationId
    )
    .map((item: menus_menu_cats_locations) => item.menu_cat_id)
    .filter((item: any) => typeof item === "number") as number[];

  const menuCatByLocId = menuCategories.filter((item: menu_cats) =>
    menuCatId.includes(item.id)
  );

  const [menuCat, setMenuCat] = useState({
    name: "",
    locationIds: [],
  });

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setMenuCat({ ...menuCat, locationIds: childStateSelectedLocationIds });
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
        <MenuCatSelect menuCategories={menuCatByLocId} />
      </Box>
    </Layout>
  );
}
