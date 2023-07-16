import axios from "axios";
import { menus } from "@prisma/client";
import { useContext, useState } from "react";

import Dialog from "@mui/material/Dialog";
import { Button, Input } from "@material-tailwind/react";

import MenuSelect from "@/components/MenuSelect";
import { AdminContext } from "@/contexts/AdminContext";
import { useAppDispatch } from "@/store/hooks";
import { addMenuCat } from "@/store/slices/menuCatsSlice";
import { addMenusMenuCats } from "@/store/slices/menusMenuCatsSlice";

interface Props {
  menus: menus[];
}

const MenuCatCreate = ({ menus }: Props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [menuCat, setMenuCat] = useState({
    name: "",
    menusIds: [],
  });

  const handleOpen = () => setOpen(!open);

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setMenuCat({
      ...menuCat,
      menusIds: childStateSelectedMenuIds,
    });
  };

  const createMenuCategory = async () => {
    const res = await axios.post(`/api/admin/menuCategories`, {
      menuCat,
    });

    const { menuCat: menuCatBb, newMenusMenuCats } = res.data;

    dispatch(addMenuCat(menuCatBb));
    dispatch(addMenusMenuCats(newMenusMenuCats));

    setMenuCat({
      name: "",
      menusIds: [],
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Create Menu Category
      </Button>

      <Dialog open={open} onClose={handleOpen}>
        <div className="flex flex-col items-center px-20 py-28 space-y-2">
          <div className="w-[280px]">
            <Input
              type="text"
              label="Menu Category Name"
              onChange={(e) => setMenuCat({ ...menuCat, name: e.target.value })}
            />
          </div>
          <MenuSelect menus={menus} onStateChange={menuStateChange} />

          <Button onClick={createMenuCategory} variant="gradient">
            Create Menu Category
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default MenuCatCreate;
