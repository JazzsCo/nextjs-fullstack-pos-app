import axios from "axios";
import { useContext, useState } from "react";

import { addon_cats, menu_cats, menus } from "@prisma/client";
import { AppContext } from "@/contexts/AppContext";

import { Dialog } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";

import MenuListUpdate from "./MenuListUpdate";

interface Props {
  menus: menus[];
  selectedMenus: menus[];
  addonCat: addon_cats;
  menuNotHaveLocationIds: Number[];
}

const AddonCatUpdate = ({
  menus,
  selectedMenus,
  addonCat,
  menuNotHaveLocationIds,
}: Props) => {
  const { fetchData } = useContext(AppContext);

  const [addonCatName, setAddonCatName] = useState(addonCat?.addon_cat_name);
  const [menuId, setMenuId] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuId(childStateSelectedMenuIds);
  };

  const menuCatUpdate = async () => {
    await axios.put(`/api/addonCategory?id=${addonCat.id}`, {
      menuId,
      addonCatName,
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
              label="Addon Category Name"
              defaultValue={addonCatName}
              onChange={(e) => setAddonCatName(e.target.value)}
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

export default AddonCatUpdate;
