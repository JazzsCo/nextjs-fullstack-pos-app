import Link from "next/link";
import { useRouter } from "next/router";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { BsFillCartPlusFill } from "react-icons/bs";

import MenuCards from "./MenuCards";
import { menus, menus_menu_cats } from "@prisma/client";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getMenuCatIdsByMenuIds, getMenuIdsByLocationId } from "@/libs/custom";

export default function TabsComponent() {
  const { menus, menuCategories, menusMenuCats, menusLocations } =
    useAppSelector(appData);

  const { query } = useRouter();
  const { locationId } = query;

  const menuIdsBylocationId = getMenuIdsByLocationId(
    Number(locationId),
    menusLocations
  );

  const menuCatIdsByMenuIds = getMenuCatIdsByMenuIds(
    menuIdsBylocationId,
    menusMenuCats
  );

  const menusByLocation = menus.filter((item) =>
    menuIdsBylocationId.includes(item.id)
  );

  const menuCatsByMenus = menuCategories.filter((item) =>
    menuCatIdsByMenuIds.includes(item.id)
  );

  const menusByMenuCatId = (id: number) => {
    const menuIds = menusMenuCats
      .filter((item: menus_menu_cats) => item.menu_cat_id === id)
      .map((item: menus_menu_cats) => item.menu_id);

    const menusByMenuCat = menusByLocation.filter((item: menus) =>
      menuIds.includes(item.id)
    );

    return <MenuCards menus={menusByMenuCat} query={query} />;
  };

  return (
    <div>
      <Link href={{ pathname: "/order/cart", query }}>
        <BsFillCartPlusFill />
      </Link>

      <Tabs value={"Most Popular"}>
        <TabsHeader>
          {menuCatsByMenus?.map(({ id, menu_cat_name }) => (
            <Tab key={id} value={menu_cat_name}>
              {menu_cat_name}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {menuCatsByMenus?.map(({ id, menu_cat_name }) => (
            <TabPanel key={id} value={menu_cat_name}>
              {menusByMenuCatId(id)}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
