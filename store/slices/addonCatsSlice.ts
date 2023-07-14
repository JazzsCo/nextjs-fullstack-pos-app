import { addon_cats as AddonCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface AddonCatsState {
  isLoading: boolean;
  items: AddonCategory[];
  error: Error | null;
}

const initialState: AddonCatsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonCatsSlice = createSlice({
  name: "addonCats",
  initialState,
  reducers: {
    setAddonCats: (state, action) => {
      state.items = action.payload;
    },
    addAddonCat: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setAddonCats, addAddonCat } = addonCatsSlice.actions;

export default addonCatsSlice.reducer;
