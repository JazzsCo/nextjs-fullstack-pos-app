import axios from "axios";
import { menus } from "@prisma/client";
import { useContext, useState } from "react";

import MenuSelect from "./MenuSelect";

import { Dialog } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";
import { AdminContext } from "@/contexts/AdminContext";

interface Props {
  menu: menus[];
}

const AddonCatCreate = ({ menu }: Props) => {
  const { fetchData } = useContext(AdminContext);

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

    setAddonCatName({
      name: "",
      menuIds: [],
    });

    fetchData();
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
