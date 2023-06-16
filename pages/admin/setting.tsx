import { useContext, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { AppContext } from "@/contexts/AppContext";
import type { locations as Location } from "@prisma/client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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

      const selectedLocation = locations.find(
        (location) => String(location.id) === locationId
      );
      setSelectedLocation(selectedLocation);
    }
  }, [locations]);

  return (
    <Layout>
      <div className="-mr-[210px]">
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
      </div>
    </Layout>
  );
};

export default Setting;
