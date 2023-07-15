import { addons_addon_cats as AddonAddonCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface AddonsAddonCatsState {
  isLoading: boolean;
  items: AddonAddonCategory[];
  error: Error | null;
}

const initialState: AddonsAddonCatsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonsAddonCatsSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setAddonsAddonCats: (state, action) => {
      state.items = action.payload;
    },
    addAddonsAddonCats: (state, action) => {
      action.payload.map((item: AddonAddonCategory) => {
        state.items = [...state.items, item];
      });
    },
  },
});

export const { setAddonsAddonCats, addAddonsAddonCats } =
  addonsAddonCatsSlice.actions;

export default addonsAddonCatsSlice.reducer;
