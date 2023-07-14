import { configureStore } from "@reduxjs/toolkit";
import menusSlice from "./slices/menusSlice";
import orderlinesSlice from "./slices/orderlinesSlice";
import ordersSlice from "./slices/ordersSlice";
import tablesSlice from "./slices/tablesSlice";
import appSlice from "./slices/appSlice";
import addonCatsSlice from "./slices/addonCatsSlice";
import addonsSlice from "./slices/addonsSlice";
import cartsSlice from "./slices/cartsSlice";
import companySlice from "./slices/companySlice";
import locationsSlice from "./slices/locationsSlice";
import menuCatsSlice from "./slices/menuCatsSlice";
import menusAddonCatsSlice from "./slices/menusAddonCatsSlice";
import menusLocationsSlice from "./slices/menusLocationsSlice";
import menusMenuCatsSlice from "./slices/menusMenuCatsSlice";
import addonsAddonCatsSlice from "./slices/addonsAddonCatsSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    addonCats: addonCatsSlice,
    addons: addonsSlice,
    carts: cartsSlice,
    company: companySlice,
    locations: locationsSlice,
    menuCats: menuCatsSlice,
    menusAddonCats: menusAddonCatsSlice,
    menusMenuCats: menusMenuCatsSlice,
    menusLocations: menusLocationsSlice,
    addonsAddonCats: addonsAddonCatsSlice,
    menus: menusSlice,
    orderlines: orderlinesSlice,
    orders: ordersSlice,
    tables: tablesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
