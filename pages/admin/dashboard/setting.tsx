import { useContext, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { AppContext } from "@/contexts/AppContext";
import type {
  menus as Menu,
  menu_cats as MenuCategory,
  addon_cats as AddonCategory,
  addons as Addon,
  addons_addon_cats as AddonAddonCat,
  menus_addon_cats as MenusAddonCat,
  menus_menu_cats as MenusMenuCat,
  locations as Location,
} from "@prisma/client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

const Setting = () => {
  const { locations } = useContext(AppContext);

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();

  const handleChange = (evt: SelectChangeEvent<number>) => {
    localStorage.setItem("locationId", String(evt.target.value));
    const selectedLocation = locations.find(
      (location) => location.id === evt.target.value
    );
    setSelectedLocation(selectedLocation);
  };

  useEffect(() => {
    if (locations.length) {
      const locationId = localStorage.getItem("locationId");

      if (!locationId) {
        localStorage.setItem("locationId", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        // main point ***
        const selectedLocation = locations.find(
          (location) => String(location.id) === locationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
  }, [locations]);

  return (
    <Layout>
      <Box sx={{ maxWidth: 300, m: "0 auto", mt: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation.id : ""} // main point ***
            label="Locations"
            onChange={handleChange}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.location_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Setting;
