import { useContext } from "react";
import { useRouter } from "next/router";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import MenuCards from "./MenuCards";
import { OrderContext } from "@/contexts/OrderContext";
import { menu_cats, menus, menus_menu_cats } from "@prisma/client";

export default function TabsComponent() {
  const { menus, menuCategories, menusMenuCat } = useContext(OrderContext);

  const { query } = useRouter();

  const menusByMenuCatId = (id: number) => {
    const menuIds = menusMenuCat
      .filter((item: menus_menu_cats) => item.menu_cat_id === id)
      .map((item: menus_menu_cats) => item.menu_id);

    const menusByMenuCat = menus.filter((item: menus) =>
      menuIds.includes(item.id)
    );

    return <MenuCards menus={menusByMenuCat} query={query} />;
  };

  return (
    <Tabs value={"Main Dash"}>
      <TabsHeader>
        {menuCategories.map(({ id, menu_cat_name }) => (
          <Tab key={id} value={menu_cat_name}>
            {menu_cat_name}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {menuCategories.map(({ id, menu_cat_name }) => (
          <TabPanel key={id} value={menu_cat_name}>
            {menusByMenuCatId(id)}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
