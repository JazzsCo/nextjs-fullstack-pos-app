import { CartItem } from "@/libs/types";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  isLoading: boolean;
  items: CartItem[];
  error: Error | null;
}

const initialState: CartState = {
  isLoading: false,
  items: [],
  error: null,
};

export const cartsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = cartsSlice.actions;

export default cartsSlice.reducer;
