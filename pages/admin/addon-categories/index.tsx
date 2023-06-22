import Layout from "@/components/Layout";
import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import MenuSelect from "@/components/MenuSelect";
import {
  addon_cats,
  menus,
  menus_addon_cats,
  menus_locations,
} from "@prisma/client";
import { Button, Input } from "@material-tailwind/react";
import { getMenuIdsByLocationId } from "@/libs/custom";

const AddonCategory = () => {
  const locationId = Number(LocationId());

  const [open, setOpen] = useState(false);

  const [addonCatName, setAddonCatName] = useState({
    name: "",
    menuIds: [],
  });

  const { menus, addonCategories, menusAddonCat, menusLocation, fetchData } =
    useContext(AppContext);

  const menuIds = getMenuIdsByLocationId(locationId, menusLocation);

  const getMenusByLocationIds = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const addonCatIds = menusAddonCat
    .filter((item: menus_addon_cats) => menuIds.includes(item.menu_id))
    .map((item: menus_addon_cats) => item.addon_cat_id);

  const addonCatByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

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
    const res = await axios.post(`/api/addonCategory`, {
      addonCatName,
    });

    setAddonCatName({
      name: "",
      menuIds: [],
    });

    fetchData();
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <Button onClick={handleOpen} variant="gradient">
          Create Addon Category
        </Button>
      </div>

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
          <MenuSelect
            menus={getMenusByLocationIds}
            onStateChange={menuStateChange}
          />

          <Button onClick={createAddonCategory} variant="gradient">
            Create Addon Category
          </Button>
        </div>
      </Dialog>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {addonCatByMenu.map((item: addon_cats) => (
          <div
            key={item.id}
            className="w-[10rem] h-[7rem] flex flex-col items-center justify-center bg-blue-gray-200 rounded-md"
          >
            <h1>{item.addon_cat_name}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AddonCategory;
