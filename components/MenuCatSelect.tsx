import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { title } from "process";
import { AppContext } from "../contexts/AppContext";

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

export default function MenuCatSelect({ onStateChange }: any) {
  const { menuCategories } = useContext(AppContext);

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

    const selectedIds = menuCategories
      .filter((menuCat) => {
        return selectedNames.includes(menuCat.menu_cat_name);
      })
      .map((menuCat) => {
        return menuCat.id;
      });

    onStateChange(selectedIds);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Menu Categories</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Menu Categories" />}
          MenuProps={MenuProps}
        >
          {menuCategories &&
            menuCategories.map((menuCat: any) => (
              <MenuItem
                key={menuCat.id}
                value={menuCat.category_name}
                style={getStyles(menuCat.category_name, personName, theme)}
              >
                {menuCat.category_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
