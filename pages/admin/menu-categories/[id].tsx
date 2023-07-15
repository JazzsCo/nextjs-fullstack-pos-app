import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";

import { LocationId } from "@/libs/locationId";
import { AdminContext } from "@/contexts/AdminContext";
import { getMenuIdsByLocationId } from "@/libs/custom";

import Layout from "@/components/Layout";
import MenuCards from "@/components/MenuCards";
import DeleteDialog from "@/components/DeleteDialog";
import MenuCatUpdate from "@/components/MenuCatUpdate";

import type { menu_cats, menus, menus_menu_cats } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeMenuCat } from "@/store/slices/menuCatsSlice";

const MenuCatById = () => {
  const dispatch = useAppDispatch();

  const { menus, menuCategories, menusMenuCats, menusLocations } =
    useAppSelector(appData);

  const router = useRouter();
  const { id } = router.query;

  const locationId = Number(LocationId());

  const currentMenuCat = menuCategories.filter(
    (item: menu_cats) => item.id === Number(id)
  )[0];

  const menuIds = getMenuIdsByLocationId(locationId, menusLocations);

  const getMenusByLocationId = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const menusNotHaveLocationIds = menus
    .filter((item: menus) => !getMenusByLocationId.includes(item))
    .map((item: menus) => item.id);

  const selectedMenuIds = menusMenuCats
    .filter((item: menus_menu_cats) => item.menu_cat_id === Number(id))
    .map((item: menus_menu_cats) => item.menu_id);

  const selectedMenus = getMenusByLocationId.filter((item: menus) =>
    selectedMenuIds.includes(item.id)
  );

  const deleteMenuCat = async () => {
    const res = await axios.delete(`/api/admin/menuCategories?id=${id}`);

    const { deleteMenuCat } = res.data;

    dispatch(removeMenuCat(deleteMenuCat));

    router.push("/admin/menu-categories");
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <div className="flex justify-around space-x-2 mr-2">
          <MenuCatUpdate
            menus={getMenusByLocationId}
            selectedMenus={selectedMenus}
            menuNotHaveLocationIds={menusNotHaveLocationIds}
            menuCat={currentMenuCat}
          />
          <DeleteDialog callback={deleteMenuCat} />
        </div>
      </div>
      <div className="w-[10rem] h-[7rem] ml-[18rem] my-16 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
        <h1>{currentMenuCat?.menu_cat_name}</h1>
      </div>
      <MenuCards menus={selectedMenus} />
    </Layout>
  );
};

export default MenuCatById;
