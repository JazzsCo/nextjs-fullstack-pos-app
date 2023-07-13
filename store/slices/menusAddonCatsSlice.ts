import { menus_addon_cats as MenuAddonCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenusAddonCatsState {
  isLoading: boolean;
  items: MenuAddonCategory[];
  error: Error | null;
}

const initialState: MenusAddonCatsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusAddonCatsSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCats: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCats } = menusAddonCatsSlice.actions;

export default menusAddonCatsSlice.reducer;
