import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
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
import { Location } from "@/typings/types";

const Setting = () => {
  const { locations } = useContext(AppContext);

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();

  // Get this data from button elements
  // const handleClick = async (id: any) => {
  //   await axios
  //     .get(`/api/menusPost?id=${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });

  //   console.log("Hello ma ma ");
  //   console.log("ma ma ko chit tl ");
  // };

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
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Setting;

// -- UPDATE menus_order SET name='ABC', price=200, is_avilable='true'
// -- WHERE id=10

// -- ALTER TABLE location_menus
// -- ADD COLUMN "is_available"
// -- BOOLEAN DEFAULT TRUE

// select menus.name,
// price, is_available, locations.name from menus
// inner join location_menus on location_menus.menu_id = menus.id
// inner join locations on locations.id=location_menus.location_id
// where locations.id=2
