import { menus_locations as MenuLocation } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenuLocationState {
  isLoading: boolean;
  items: MenuLocation[];
  error: Error | null;
}

const initialState: MenuLocationState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusLocationsSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusLocations: (state, action) => {
      state.items = action.payload;
    },
    addMenusLocations: (state, action) => {
      action.payload.map((item: MenuLocation) => {
        state.items = [...state.items, item];
      });
    },
  },
});

export const { setMenusLocations, addMenusLocations } =
  menusLocationsSlice.actions;

export default menusLocationsSlice.reducer;
