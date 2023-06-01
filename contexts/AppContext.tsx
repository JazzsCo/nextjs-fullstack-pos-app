import { createContext, useState, useEffect, useCallback } from "react";
import {
  Addon,
  AddonCategory,
  Location,
  MenuCategory,
  Menu,
  AddonAddonCat,
  MenusAddonCat,
  MenusMenuCat,
} from "../typings/types";
import axios from "axios";
import { useSession } from "next-auth/react";

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
  const url = `/api/getAllData`;

  const { data: session } = useSession();

  const [data, updateData] = useState(defaultContext);

  // console.log("data is", data);

  const fetchData = async () => {
    await axios
      .get(url)
      .then((res) => {
        const { menuCategories, addons, addonCategories, locations } = res.data;
        updateData({
          ...data,
          menuCategories,
          addons,
          addonCategories,
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
