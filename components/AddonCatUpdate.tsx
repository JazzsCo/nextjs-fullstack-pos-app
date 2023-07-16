import axios from "axios";
import { useState } from "react";
import { addon_cats, menus } from "@prisma/client";
import { Dialog } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";

import MenuListUpdate from "./MenuListUpdate";
import { useAppDispatch } from "@/store/hooks";
import { updateAddonCat } from "@/store/slices/addonCatsSlice";
import { setMenusAddonCats } from "@/store/slices/menusAddonCatsSlice";

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
  const dispatch = useAppDispatch();

  const [addonCatName, setAddonCatName] = useState(addonCat?.addon_cat_name);
  const [menuId, setMenuId] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuId(childStateSelectedMenuIds);
  };

  const addonCatUpdate = async () => {
    const res = await axios.put(
      `/api/admin/addonCategories?id=${addonCat.id}`,
      {
        menuId,
        addonCatName,
        menuNotHaveLocationIds,
      }
    );

    const { updateAddoncat, menusAddonCats } = res.data;

    dispatch(updateAddonCat(updateAddoncat));
    dispatch(setMenusAddonCats(menusAddonCats));
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

          <Button onClick={addonCatUpdate} variant="gradient">
            Update
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddonCatUpdate;
