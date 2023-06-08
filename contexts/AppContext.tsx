import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import type {
  menus as Menu,
  menu_cats as MenuCategory,
  addon_cats as AddonCategory,
  addons as Addon,
  addons_addon_cats as AddonAddonCat,
  menus_menu_cats_addon_cats_locations as MenusMenuCatAddonCatLocation,
  // menus_menu_cats as MenusMenuCat,
  locations as Location,
} from "@prisma/client";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  addonAddonCat: AddonAddonCat[];
  locations: Location[];
  menusMenuCatAddonCatLocation: MenusMenuCatAddonCatLocation[];
  accessToken: string;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  addonAddonCat: [],
  locations: [],
  menusMenuCatAddonCatLocation: [],
  accessToken: "",
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = ({ children }: any) => {
  const { data: session } = useSession();

  const [data, updateData] = useState(defaultContext);

  console.log("data is", data);

  const fetchData = async () => {
    const res = await axios.get(`/api/getAllData`);

    const {
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusMenuCatAddonCatLocation,
      locations,
    } = res.data;

    updateData({
      ...data,
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusMenuCatAddonCatLocation,
      locations,
    });
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
