import axios from "axios";
import { useContext, useState } from "react";

import { menu_cats, menus } from "@prisma/client";
import { AppContext } from "@/contexts/AppContext";

import { Dialog } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";

import MenuListUpdate from "./MenuListUpdate";

interface Props {
  menus: menus[];
  selectedMenus: menus[];
  menuCat: menu_cats;
  menuNotHaveLocationIds: Number[];
}

const MenuCatUpdate = ({
  menus,
  selectedMenus,
  menuCat,
  menuNotHaveLocationIds,
}: Props) => {
  const { fetchData } = useContext(AppContext);

  const [menuCatName, setMenuCatName] = useState(menuCat?.menu_cat_name);
  const [menuId, setMenuId] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuId(childStateSelectedMenuIds);
  };

  const menuCatUpdate = async () => {
    await axios.put(`/api/menuCategories?id=${menuCat.id}`, {
      menuId,
      menuCatName,
      menuNotHaveLocationIds,
    });

    fetchData();
  };

  return (
    <div>
      <div className="absolute top-[5.5rem] right-10">
        <Button onClick={handleOpen}>Update</Button>
      </div>

      <Dialog open={open} onClose={handleOpen}>
        <div className="w-full flex flex-col items-center px-20 py-24 space-y-3">
          <div className="w-[300px]">
            <Input
              type="text"
              label="Menu Category Name"
              defaultValue={menuCatName}
              onChange={(e) => setMenuCatName(e.target.value)}
            />
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
