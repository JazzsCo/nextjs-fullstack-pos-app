import { createContext, useState, useEffect } from "react";
import {
  Addon,
  AddonCategory,
  Locations,
  MenuCategory,
  Menus,
} from "../typings/types";
import axios from "axios";

interface AppContextType {
  menus: Menus[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  location: Locations[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  location: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);

  console.log("data is", data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () =>
    await axios
      .get("/api/getAllData")
      .then((res) => {
        const { menus, menuCategories, addons, addonCategories, location } =
          res.data;
        updateData({
          ...data,
          menus,
          menuCategories,
          addons,
          addonCategories,
          location,
        });
        return res;
      })
      .catch((err) => {
        return err;
      });

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
