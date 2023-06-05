import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import type {
  menus as Menu,
  menu_cats as MenuCategory,
  addon_cats as AddonCategory,
  addons as Addon,
  addons_addon_cats as AddonAddonCat,
  menus_addon_cats as MenusAddonCat,
  menus_menu_cats as MenusMenuCat,
  locations as Location,
} from "@prisma/client";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  addonAddonCat: AddonAddonCat[];
  menusMenuCat: MenusMenuCat[];
  menusAddonCat: MenusAddonCat[];
  locations: Location[];
  accessToken: string;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusAddonCat: [],
  menusMenuCat: [],
  addonAddonCat: [],
  locations: [],
  accessToken: "",
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = ({ children }: any) => {
  const url = `/api/locations`;

  const { data: session } = useSession();

  const [data, updateData] = useState(defaultContext);

  // console.log("data is", data);

  const fetchData = async () => {
    await axios
      .get(url)
      .then((res) => {
        const { locations } = res.data;
        updateData({
          ...data,
          locations,
        });
        return res;
      })
      .catch((err) => {
        return err;
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
