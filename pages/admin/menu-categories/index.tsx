import Link from "next/link";
import { useContext } from "react";

import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import {
  menu_cats,
  menus,
  menus_locations,
  menus_menu_cats,
} from "@prisma/client";

import Layout from "@/components/Layout";
import MenuCatCreate from "@/components/MenuCatCreate";
import { getMenuIdsByLocationId } from "@/libs/custom";

export default function MenuCategories() {
  const locationId = Number(LocationId());

  const { menus, menuCategories, menusMenuCat, menusLocation } =
    useContext(AppContext);

  const menuIds = getMenuIdsByLocationId(locationId, menusLocation);

  const getMenusByLocationId = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const menuCountByMenuCatIds = (id: number) => {
    const menuIdByMenuCat = menusMenuCat
      .filter((item: menus_menu_cats) => item.menu_cat_id === id)
      .map((item: menus_menu_cats) => item.menu_id);

    const count = menuIds.filter((item: number) =>
      menuIdByMenuCat.includes(item)
    );

    return count.length;
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <MenuCatCreate menus={getMenusByLocationId} />
      </div>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {menuCategories.map((item: menu_cats) => (
          <Link key={item.id} href={`/admin/menu-categories/${item.id}`}>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-[10rem] h-[7rem] cursor-pointer hover:bg-blue-gray-400 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
                <h1>{menuCountByMenuCatIds(item.id)} menus</h1>
              </div>
              <h1>{item.menu_cat_name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
