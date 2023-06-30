import { useRouter } from "next/router";

import { createContext, useState, useEffect } from "react";

import {
  addon_cats,
  addons,
  addons_addon_cats,
  menu_cats,
  menus,
  menus_addon_cats,
  menus_locations,
  menus_menu_cats,
} from "@prisma/client";
import { Orderline } from "@/libs/types";

interface OrderContextType {
  menus: menus[];
  menuCategories: menu_cats[];
  addonCategories: addon_cats[];
  addons: addons[];
  locations: Location[];
  menusAddonCat: menus_addon_cats[];
  menusMenuCat: menus_menu_cats[];
  addonAddonCat: addons_addon_cats[];
  menusLocation: menus_locations[];
  updateData: (value: any) => void;
  fetchData: () => void;
  orderlines: Orderline[];
}

const defaultContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addonCategories: [],
  addons: [],
  menusAddonCat: [],
  menusMenuCat: [],
  addonAddonCat: [],
  menusLocation: [],
  locations: [],
  updateData: () => {},
  fetchData: () => {},
  orderlines: [],
};

export const OrderContext = createContext<OrderContextType>(defaultContext);

const OrderProvider = (props: any) => {
  const router = useRouter();
  const query = router.query;
  const locationId = query.locationId;
  const [data, updateData] = useState(defaultContext);

  console.log(data);

  const fetchData = async () => {
    if (!locationId) return;

    const response = await fetch(`/api/order?locationId=${locationId}`);
    const responseJson = await response.json();

    const {
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusLocation,
      menusMenuCat,
      locations,
      menusAddonCat,
      addonAddonCat,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addonCategories,
      addons,
      menusLocation,
      menusMenuCat,
      locations,
      menusAddonCat,
      addonAddonCat,
    });
  };

  useEffect(() => {
    if (locationId) {
      fetchData();
    }
  }, [locationId]);

  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
