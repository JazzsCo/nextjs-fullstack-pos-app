import { menus_menu_cats as MenuMenuCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenusMenuCatsState {
  isLoading: boolean;
  items: MenuMenuCategory[];
  error: Error | null;
}

const initialState: MenusMenuCatsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusMenuCatsSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusMenuCats: (state, action) => {
      state.items = action.payload;
    },
    addMenusMenuCats: (state, action) => {
      action.payload.map((item: MenuMenuCategory) => {
        state.items = [...state.items, item];
      });
    },
  },
});

export const { setMenusMenuCats, addMenusMenuCats } =
  menusMenuCatsSlice.actions;

export default menusMenuCatsSlice.reducer;
