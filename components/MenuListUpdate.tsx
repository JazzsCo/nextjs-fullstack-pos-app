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
import { locations, menus } from "@prisma/client";

interface Props {
  onStateChange: (childStateSelectedMenuId: any) => void;
  selectedMenus: menus[];
  menus: menus[];
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

export default function MenuListUpdate({
  menus,
  selectedMenus,
  onStateChange,
}: Props) {
  const selectedMenuIds = selectedMenus.map((item: menus) => item.id);

  const selectedMenuNames = selectedMenus.map((item: menus) => item.name);

  const [personName, setPersonName] =
    React.useState<string[]>(selectedMenuNames);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    const selectedNames = event.target.value as string[];

    const selectedIds = menus
      .filter((item: menus) => {
        return selectedNames.includes(item.name);
      })
      .map((item: menus) => {
        return item.id;
      });

    onStateChange && onStateChange(selectedIds);
  };

  useEffect(() => {
    onStateChange && onStateChange(selectedMenuIds);
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
          {menus.map((item: any) => (
            <MenuItem key={item.id} value={item.name}>
              <Checkbox checked={personName.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
