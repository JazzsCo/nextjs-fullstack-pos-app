import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AppContext } from "../contexts/AppContext";
import { useContext, useState } from "react";
import { locations } from "@prisma/client";

interface Props {
  onStateChange?: (childStateSelectedLocationIds: any) => void;
  locations?: locations[];
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function LocationsSelect({ onStateChange }: Props) {
  const { locations } = useContext(AppContext);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const selectedNames = event.target.value as string[];

    const selectedIds =
      locations &&
      locations
        .filter((location) => {
          return selectedNames.includes(location.location_name);
        })
        .map((location) => {
          return location.id;
        });

    onStateChange && onStateChange(selectedIds);
  };

  return (
    <div>
      <FormControl sx={{ width: 280 }}>
        <InputLabel id="demo-multiple-name-label">Locations</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Locations" />}
          MenuProps={MenuProps}
        >
          {locations &&
            locations.map((location: any) => (
              <MenuItem
                key={location.id}
                value={location.location_name}
                style={getStyles(location.location_name, personName, theme)}
              >
                {location.location_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
