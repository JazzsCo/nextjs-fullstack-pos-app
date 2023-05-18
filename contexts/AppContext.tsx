import { createContext, useState, useEffect } from "react";
import {
  Addon,
  AddonCategory,
  Location,
  MenuCategory,
  Menu,
} from "../typings/types";
import axios from "axios";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);

  console.log("data is", data);

  const fetchData = async () =>
    await axios
      .get("../apiserver/getAllData")
      .then((res) => {
        const { menus, menuCategories, addons, addonCategories, locations } =
          res.data;
        updateData({
          ...data,
          menus,
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

  // const getMenusByLocationId = async (id: string) => {
  //   await axios
  //     .get(`/api/menusPost?id=${id}`)
  //     .then((res) => {
  //       const { menus } = res.data;
  //       updateData({ ...data, menus });
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // };

  // useEffect(() => {
  //   console.log("location id effect");
  //   const locationId = localStorage.getItem("locationId");
  //   if (!locationId) {
  //     localStorage.setItem("locationId", String(1));
  //     return;
  //   } else {
  //     getMenusByLocationId(locationId);
  //   }
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //   const fetchData = async () => {
  //     const response = await fetch("/api/getAllData");
  //     const responseJson = await response.json();
  //     const { menus, menuCategories, addons, addonCategories } = responseJson;
  //     updateData({
  //       ...data,
  //       menus,
  //       menuCategories,
  //       addons,
  //       addonCategories,
  //     });
  //   };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
