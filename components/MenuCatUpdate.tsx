import Layout from "@/components/Layout";
import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import MenuSelect from "@/components/MenuSelect";
import { FcInfo } from "react-icons/fc";
import {
  addon_cats,
  locations,
  menu_cats,
  menus,
  menus_addon_cats,
  menus_locations,
} from "@prisma/client";
import { Button, Input } from "@material-tailwind/react";
import LocationsSelect from "./LocationsSelect";
import LocationUpdate from "./LocationUpdate";
import MenuListUpdate from "./MenuListUpdate";

interface Props {
  menus: menus[];
  selectedMenus: menus[];
  menuCat: menu_cats;
}

const MenuCatUpdate = ({ menus, selectedMenus, menuCat }: Props) => {
  const [menuId, setMenuId] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuId(childStateSelectedMenuIds);
  };

  const menuCatUpdate = async () => {
    const res = await axios.put(`/api/menusPost?id=`, { menuId });

    console.log(res);
  };

  console.log(menuId);

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>
          <FcInfo />
        </Button>
      </div>

      <Dialog open={open} onClose={handleOpen}>
        <div className="w-full flex flex-col items-center px-20 py-24 space-y-3">
          <div className="w-[280px]">
            {/* <Input
              type="text"
              label="Addon Category Name"
              onChange={(e) =>
                setAddonCatName({ ...addonCatName, name: e.target.value })
              }
            /> */}
          </div>

          <MenuListUpdate
            menus={menus}
            selectedMenus={selectedMenus}
            onStateChange={menuStateChange}
          />

          <Button onClick={menuCatUpdate} variant="gradient">
            Update
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default MenuCatUpdate;
