import axios from "axios";
import Layout from "@/components/Layout";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import { Button, Input } from "@material-tailwind/react";
import Dialog from "@mui/material/Dialog";
import MenuSelect from "@/components/MenuSelect";
import {
  menu_cats,
  menus,
  menus_locations,
  menus_menu_cats,
} from "@prisma/client";

export default function MenuCategories() {
  const locationId = Number(LocationId());

  const [open, setOpen] = useState(false);

  const [menuCat, setMenuCat] = useState({
    name: "",
    menusIds: [],
  });

  const { menus, menuCategories, menusMenuCat, menusLocation, fetchData } =
    useContext(AppContext);

  const menuIds = menusLocation
    .filter((item: menus_locations) => item.location_id === locationId)
    .map((item: menus_locations) => item.menu_id);

  const getMenusByLocationIds = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const menuCatIds = menusMenuCat
    .filter((item: menus_menu_cats) => menuIds.includes(item.menu_id))
    .map((item: menus_menu_cats) => item.menu_cat_id);

  const menuCatByMenu = menuCategories.filter((item: menu_cats) =>
    menuCatIds.includes(item.id)
  );

  const handleOpen = () => setOpen(!open);

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuCat({
      ...menuCat,
      menusIds: childStateSelectedMenuIds,
    });
  };

  const createMenuCategory = async () => {
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
          <MenuSelect
            menus={getMenusByLocationIds}
            onStateChange={menuStateChange}
          />

          <Button onClick={createMenuCategory} variant="gradient">
            Create Menu Category
          </Button>
        </div>
      </Dialog>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {menuCatByMenu.map((item: menu_cats) => (
          <div
            key={item.id}
            className="w-[10rem] h-[7rem] flex flex-col items-center justify-center bg-blue-gray-200 rounded-md"
          >
            <h1>{item.menu_cat_name}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
}
