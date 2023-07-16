import Layout from "@/components/Layout";
import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "@/contexts/AdminContext";
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
import { useAppDispatch } from "@/store/hooks";
import { updateMenus } from "@/store/slices/menusSlice";
import { setMenusLocations } from "@/store/slices/menusLocationsSlice";

interface Props {
  menu: menus;
  location: locations[];
}

const MenuUpdate = ({ menu, location }: Props) => {
  const dispatch = useAppDispatch();

  const [updateMenu, setUpdateMenu] = useState({
    name: menu?.name,
    price: menu?.price,
  });
  const [locationId, setLocationId] = useState<number[]>([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setLocationId(childStateSelectedLocationIds);
  };

  const menuUpdate = async () => {
    const res = await axios.put(`/api/admin/menus?id=${menu.id}`, {
      updateMenu,
      locationId,
    });

    const { menuUpdate, menusLocations } = res.data;

    dispatch(updateMenus(menuUpdate));
    dispatch(setMenusLocations(menusLocations));
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
          <div className="w-[300px] space-y-3">
            <Input
              type="text"
              label="Menu Name"
              defaultValue={updateMenu.name}
              onChange={(e) =>
                setUpdateMenu({ ...updateMenu, name: e.target.value })
              }
            />

            <Input
              type="number"
              label="Price"
              defaultValue={updateMenu.price}
              onChange={(e) =>
                setUpdateMenu({ ...updateMenu, price: Number(e.target.value) })
              }
            />
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
