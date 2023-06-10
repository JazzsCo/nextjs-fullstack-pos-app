import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
import { Button, Input } from "@material-tailwind/react";
import Dialog from "@mui/material/Dialog";
import MenuSelect from "@/components/MenuSelect";

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
    menusIds: [],
  });

  const handleSubmit = async () => {
    const url = `/api/menuCategories`;

    const res = await axios.post(url, {
      menuCat,
    });

    setMenuCat({
      name: "",
      menusIds: [],
    });

    fetchData();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuCat({
      ...menuCat,
      menusIds: childStateSelectedMenuIds,
    });
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <Button onClick={handleOpen} variant="gradient">
          Create Menu Category
        </Button>
      </div>

      <Dialog open={open} onClose={handleOpen}>
        <div className="flex flex-col items-center px-20 py-28 space-y-2">
          <div className="w-[280px]">
            <Input
              type="text"
              label="Menu Category Name"
              onChange={(e) => setMenuCat({ ...menuCat, name: e.target.value })}
            />
          </div>
          <MenuSelect onStateChange={menuStateChange} />

          <Button onClick={handleSubmit} variant="gradient">
            Create Menu Category
          </Button>
        </div>
      </Dialog>

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
