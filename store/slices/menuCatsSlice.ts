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
    addMenuCat: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateMenuCat: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenuCat: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setMenuCats, addMenuCat, removeMenuCat, updateMenuCat } =
  menuCatsSlice.actions;

export default menuCatsSlice.reducer;
