import { tables as Table } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface TablesState {
  isLoading: boolean;
  items: Table[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateTable: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTable: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setTables, addTable, removeTable, updateTable } =
  tablesSlice.actions;

export default tablesSlice.reducer;
