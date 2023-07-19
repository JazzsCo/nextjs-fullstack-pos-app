import { orders as Order } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  isLoading: boolean;
  items: Order[];
  error: Error | null;
}

const initialState: OrdersState = {
  isLoading: false,
  items: [],
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    addOrder: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setOrders, addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
