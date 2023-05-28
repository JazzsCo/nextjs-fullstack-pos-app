import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
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

export default function AddonCatSelect({ onStateChange }: any) {
  const { addonCategories } = useContext(AppContext);
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

    const selectedIds = addonCategories
      .filter((addonCat) => {
        return selectedNames.includes(addonCat.category_name);
      })
      .map((addonCat) => {
        return addonCat.id;
      });

    onStateChange(selectedIds);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Addon Categories</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Addon Categories" />}
          MenuProps={MenuProps}
        >
          {addonCategories &&
            addonCategories.map((addonCat: any) => (
              <MenuItem
                key={addonCat.id}
                value={addonCat.category_name}
                style={getStyles(addonCat.category_name, personName, theme)}
              >
                {addonCat.category_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
