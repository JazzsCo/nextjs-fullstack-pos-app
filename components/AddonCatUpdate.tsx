import axios from "axios";
import { useContext, useState } from "react";

import { addon_cats, menu_cats, menus } from "@prisma/client";
import { AdminContext } from "@/contexts/AdminContext";

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
  const { fetchData } = useContext(AdminContext);

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
    await axios.put(`/api/admin/addonCategories?id=${addonCat.id}`, {
      menuId,
      addonCatName,
      menuNotHaveLocationIds,
    });

    fetchData();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>

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
