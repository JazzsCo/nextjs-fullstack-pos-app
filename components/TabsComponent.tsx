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

export default function TabsComponent() {
  const { menus, menuCategories, menusMenuCats } = useAppSelector(appData);

  const { query } = useRouter();

  const menusByMenuCatId = (id: number) => {
    const menuIds = menusMenuCats
      .filter((item: menus_menu_cats) => item.menu_cat_id === id)
      .map((item: menus_menu_cats) => item.menu_id);

    const menusByMenuCat = menus.filter((item: menus) =>
      menuIds.includes(item.id)
    );

    return <MenuCards menus={menusByMenuCat} query={query} />;
  };

  return (
    <div>
      <Link href={{ pathname: "/order/cart", query }}>
        <BsFillCartPlusFill />
      </Link>

      <Tabs value={"Main Dash"}>
        <TabsHeader>
          {menuCategories?.map(({ id, menu_cat_name }) => (
            <Tab key={id} value={menu_cat_name}>
              {menu_cat_name}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {menuCategories?.map(({ id, menu_cat_name }) => (
            <TabPanel key={id} value={menu_cat_name}>
              {menusByMenuCatId(id)}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
