import axios from "axios";
import { menus } from "@prisma/client";
import { Dialog } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

import MenuSelect from "./MenuSelect";
import { useAppDispatch } from "@/store/hooks";
import { addAddonCat } from "@/store/slices/addonCatsSlice";
import { addMenusAddonCats } from "@/store/slices/menusAddonCatsSlice";

interface Props {
  menu: menus[];
}

const AddonCatCreate = ({ menu }: Props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [addonCatName, setAddonCatName] = useState({
    name: "",
    menuIds: [],
  });

  const handleOpen = () => {
    setOpen(!open);
    setAddonCatName({
      name: "",
      menuIds: [],
    });
  };

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setAddonCatName({
      ...addonCatName,
      menuIds: childStateSelectedMenuIds,
    });
  };

  const createAddonCategory = async () => {
    const res = await axios.post(`/api/admin/addonCategories`, {
      addonCatName,
    });

    const { addonCat, newMenusAddonCats } = res.data;

    console.log("addonCat", addonCat);

    console.log("newMenusAddonCats", newMenusAddonCats);

    dispatch(addMenusAddonCats(newMenusAddonCats));

    dispatch(addAddonCat(addonCat));

    setAddonCatName({
      name: "",
      menuIds: [],
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Create Addon Category
      </Button>

      <Dialog open={open} onClose={handleOpen}>
        <div className="w-full flex flex-col items-center px-20 py-24 space-y-3">
          <div className="w-[280px]">
            <Input
              type="text"
              label="Addon Category Name"
              onChange={(e) =>
                setAddonCatName({ ...addonCatName, name: e.target.value })
              }
            />
          </div>
          <MenuSelect menus={menu} onStateChange={menuStateChange} />

          <Button onClick={createAddonCategory} variant="gradient">
            Create Addon Category
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddonCatCreate;
