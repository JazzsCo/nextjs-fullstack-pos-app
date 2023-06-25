import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import type {
  menus as Menu,
  menu_cats as MenuCategory,
  addon_cats as AddonCategory,
  addons as Addon,
  addons_addon_cats as AddonAddonCat,
  menus_locations as MenusLocation,
  menus_addon_cats as MenuAddonCat,
  locations as Location,
  menus_locations,
  menus_menu_cats,
  tables,
} from "@prisma/client";

interface AdminContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  addonAddonCat: AddonAddonCat[];
  menusAddonCat: MenuAddonCat[];
  tables: tables[];
  locations: Location[];
  menusLocation: menus_locations[];
  menusMenuCat: menus_menu_cats[];
  accessToken: string;
  updateData: (value: any) => void;
  fetchData: () => void;
}

const defaultContext: AdminContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  addonAddonCat: [],
  menusAddonCat: [],
  menusLocation: [],
  menusMenuCat: [],
  tables: [],
  locations: [],
  accessToken: "",
  updateData: () => {},
  fetchData: () => {},
};

export const AdminContext = createContext<AdminContextType>(defaultContext);

const AdminProvider = ({ children }: any) => {
  const { data: session } = useSession();

  const [data, updateData] = useState(defaultContext);

  // console.log("data is", data);

  const fetchData = async () => {
    const res = await axios.get(`/api/getAllData`);

    const {
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusLocation,
      tables,
      locations,
      menusAddonCat,
      addonAddonCat,
      menusMenuCat,
    } = res.data;

    updateData({
      ...data,
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusLocation,
      menusMenuCat,
      tables,
      locations,
      menusAddonCat,
      addonAddonCat,
    });
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  return (
    <AdminContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
