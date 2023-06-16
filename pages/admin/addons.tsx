import Layout from "@/components/Layout";
import { Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import {
  addon_cats,
  addons,
  addons_addon_cats,
  menus_addon_cats,
  menus_locations,
} from "@prisma/client";
import AddonCatSelect from "@/components/AddonCatSelect";
import { Button, Input } from "@material-tailwind/react";
const CreateAddons = () => {
  const locationId = Number(LocationId());

  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(0);

  const [addonCatName, setAddonCatName] = useState({
    addonIds: [],
  });
  const [addonName, setAddonName] = useState<String[]>([]);
  const [addonPrice, setAddonPrice] = useState<Number[]>([]);

  const {
    addonCategories,
    addons,
    menusAddonCat,
    addonAddonCat,
    menusLocation,
    fetchData,
  } = useContext(AppContext);

  const menuIds = menusLocation
    .filter((item: menus_locations) => item.location_id === locationId)
    .map((item: menus_locations) => item.menu_id);

  const addonCatIds = menusAddonCat
    .filter((item: menus_addon_cats) => menuIds.includes(item.menu_id))
    .map((item: menus_addon_cats) => item.addon_cat_id);

  const addonCatByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const addonIdss = addonAddonCat
    .filter((item: addons_addon_cats) =>
      addonCatIds.includes(item.addon_cat_id)
    )
    .map((item: addons_addon_cats) => item.addon_id);

  const addonByAddonCat = addons.filter((item: addons) =>
    addonIdss.includes(item.id)
  );

  const handleOpen = () => {
    setOpen(!open);
    setAddonCatName({
      addonIds: [],
    });
    setAddonName([]);
    setAddonPrice([]);
    setCount(0);
  };

  const addonIds = Array.from({ length: count }, (_, index) => index + 1);

  const addonNames = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedValues = [...addonName];
    updatedValues[index] = e.target.value;
    setAddonName(updatedValues);
  };

  const addonPrices = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedValues = [...addonPrice];
    updatedValues[index] = Number(e.target.value);
    setAddonPrice(updatedValues);
  };

  const addonStateChange = (childStateSelectedAddonCatIds: any) => {
    setAddonCatName({
      ...addonCatName,
      addonIds: childStateSelectedAddonCatIds,
    });
  };

  const createAddon = async () => {
    const res = await axios.post(`/api/createAddon`, {
      addonCatName,
      addonName,
      addonPrice,
    });

    fetchData();
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <Button onClick={handleOpen} variant="gradient">
          Create Addon
        </Button>
      </div>

      <Dialog open={open} onClose={handleOpen}>
        <div className="w-full flex flex-col items-center px-20 py-24 space-y-1">
          <div className="flex flex-col justify-center space-y-3">
            {addonIds &&
              addonIds.map((e, index) => (
                <div key={index} className="flex justify-around space-x-3">
                  <Input
                    type="text"
                    label="Addon Name"
                    onChange={(e) => addonNames(e, index)}
                  />

                  <Input
                    type="number"
                    label="Price"
                    onChange={(e) => addonPrices(e, index)}
                  />
                </div>
              ))}

            <div className="flex flex-row justify-center">
              <button
                onClick={() => {
                  setCount(count + 1);
                }}
                className="text-white w-[30px] h-[30px] bg-blue-500 rounded-full"
              >
                <AddCircleIcon />
              </button>
            </div>
          </div>
          <AddonCatSelect
            onStateChange={addonStateChange}
            addonCategories={addonCatByMenu}
          />
          <Button onClick={createAddon} variant="gradient">
            Create Addon
          </Button>
        </div>
      </Dialog>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {addonByAddonCat.map((item: addons) => (
          <div
            key={item.id}
            className="w-[10rem] h-[7rem] flex flex-col items-center justify-center bg-blue-gray-200 rounded-md"
          >
            <h1>{item.addon_name}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CreateAddons;
