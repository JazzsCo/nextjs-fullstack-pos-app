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
    setCart: (state, action) => {
      state.items === action.payload;
    },
  },
});

export const { setCart } = cartsSlice.actions;

export default cartsSlice.reducer;
