import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { AdminContext } from "@/contexts/AdminContext";
import { useContext, useEffect } from "react";
import { locations } from "@prisma/client";

interface Props {
  onStateChange?: (childStateSelectedLocationId: any) => void;
  location: locations[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function LocationUpdate({ location, onStateChange }: Props) {
  const locationIds = location.map((item: locations) => item.id);

  const locationNames = location.map((item: locations) => item.location_name);

  const [personName, setPersonName] = React.useState<string[]>(locationNames);

  const { locations } = useContext(AdminContext);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const selectedNames = event.target.value as string[];

    const selectedIds = locations
      .filter((item: locations) => {
        return selectedNames.includes(item.location_name);
      })
      .map((item: locations) => {
        return item.id;
      });

    onStateChange && onStateChange(selectedIds);
  };

  useEffect(() => {
    onStateChange && onStateChange(locationIds);
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {locations.map((item: any) => (
            <MenuItem key={item.id} value={item.location_name}>
              <Checkbox checked={personName.indexOf(item.location_name) > -1} />
              <ListItemText primary={item.location_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
