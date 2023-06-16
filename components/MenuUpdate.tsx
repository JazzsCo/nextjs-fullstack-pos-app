import Layout from "@/components/Layout";
import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import MenuSelect from "@/components/MenuSelect";
import {
  addon_cats,
  locations,
  menus,
  menus_addon_cats,
  menus_locations,
} from "@prisma/client";
import { Button, Input } from "@material-tailwind/react";
import LocationsSelect from "./LocationsSelect";
import LocationUpdate from "./LocationUpdate";

interface Props {
  menu: menus;
  location: locations[];
}

const MenuUpdate = ({ menu, location }: Props) => {
  const [locationId, setLocationId] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setLocationId(childStateSelectedLocationIds);
  };

  const menuUpdate = async () => {
    const res = await axios.put(`/api/menusPost?id=${menu.id}`, { locationId });

    console.log(res);
  };

  return (
    <div>
      <div>
        <Button onClick={handleOpen} color="cyan">
          Update
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

          <LocationUpdate
            location={location}
            onStateChange={locationStateChange}
          />

          <Button onClick={menuUpdate} variant="gradient">
            Update
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default MenuUpdate;
