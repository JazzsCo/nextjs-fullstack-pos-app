import { menu_cats as MenuCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenuCatsState {
  isLoading: boolean;
  items: MenuCategory[];
  error: Error | null;
}

const initialState: MenuCatsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menuCatsSlice = createSlice({
  name: "menuCats",
  initialState,
  reducers: {
    setMenuCats: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuCats } = menuCatsSlice.actions;

export default menuCatsSlice.reducer;
