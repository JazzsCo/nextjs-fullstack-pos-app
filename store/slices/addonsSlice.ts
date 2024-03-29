import { addons as Addon } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface AddonsState {
  isLoading: boolean;
  items: Addon[];
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action) => {
      state.items = action.payload;
    },
    addAddons: (state, action) => {
      action.payload.map((item: Addon) => {
        state.items = [...state.items, item];
      });
    },
    removeAddon: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setAddons, addAddons, removeAddon } = addonsSlice.actions;

export default addonsSlice.reducer;
