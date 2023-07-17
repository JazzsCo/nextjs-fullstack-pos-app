import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { setLocations } from "./locationsSlice";
import { setMenus } from "./menusSlice";
import { setOrderlines } from "./orderlinesSlice";
import { setOrders } from "./ordersSlice";
import { setTables } from "./tablesSlice";
import { setAddons } from "./addonsSlice";
import { setMenuCats } from "./menuCatsSlice";
import { setAddonCats } from "./addonCatsSlice";
import { setMenusAddonCats } from "./menusAddonCatsSlice";
import { setCompany } from "./companySlice";
import { setAddonsAddonCats } from "./addonsAddonCatsSlice";
import { setMenusMenuCats } from "./menusMenuCatsSlice";
import { setMenusLocations } from "./menusLocationsSlice";
import { setCarts } from "./cartsSlice";

interface AddonsState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (state, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(`/api/admin`);
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusLocations,
      tables,
      locations,
      menusAddonCats,
      addonsAddonCats,
      menusMenuCats,
      orders,
      orderlines,
    } = responseJson;
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setMenus(menus));
    thunkAPI.dispatch(setMenuCats(menuCategories));
    thunkAPI.dispatch(setAddonCats(addonCategories));
    thunkAPI.dispatch(setLocations(locations));
    thunkAPI.dispatch(setMenusAddonCats(menusAddonCats));
    thunkAPI.dispatch(setAddonsAddonCats(addonsAddonCats));
    thunkAPI.dispatch(setMenusMenuCats(menusMenuCats));
    thunkAPI.dispatch(setMenusLocations(menusLocations));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderlines(orderlines));
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setAppLoading(false));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;

export const selectMenuCats = (state: RootState) => state.menuCats.items;
export const selectMenus = (state: RootState) => state.menus.items;
export const selectMenusAddonCats = (state: RootState) =>
  state.menusAddonCats.items;
export const selectMenusLocations = (state: RootState) =>
  state.menusLocations.items;
export const selectMenusMenuCats = (state: RootState) =>
  state.menusMenuCats.items;
export const selectAddonsAddonCats = (state: RootState) =>
  state.addonsAddonCats.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectAddonCats = (state: RootState) => state.addonCats.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectCompany = (state: RootState) => state.company.isLoading;
export const selectTables = (state: RootState) => state.tables.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;
export const selectCarts = (state: RootState) => state.carts.items;

export const appData = createSelector(
  [
    selectMenus,
    selectMenuCats,
    selectAddonCats,
    selectAddons,
    selectMenusLocations,
    selectTables,
    selectLocations,
    selectMenusAddonCats,
    selectAddonsAddonCats,
    selectMenusMenuCats,
    selectOrders,
    selectOrderlines,
    selectCompany,
    selectCarts,
  ],
  (
    menus,
    menuCategories,
    addonCategories,
    addons,
    menusLocations,
    tables,
    locations,
    menusAddonCats,
    addonsAddonCats,
    menusMenuCats,
    orders,
    orderlines,
    company,
    carts
  ) => {
    return {
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusLocations,
      tables,
      locations,
      menusAddonCats,
      addonsAddonCats,
      menusMenuCats,
      orders,
      orderlines,
      company,
      carts,
    };
  }
);

export default appSlice.reducer;
