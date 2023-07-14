import { locations as Location } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface LocationsState {
  isLoading: boolean;
  items: Location[];
  error: Error | null;
}

const initialState: LocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.items = action.payload;
    },
    addLocation: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setLocations, addLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
