/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { AppContext } from "@/contexts/AppContext";
import type {
  menus as Menu,
  addon_cats,
  addons,
  addons_addon_cats,
  locations,
  menu_cats,
  menus,
  menus_addon_cats,
  menus_locations,
  menus_menu_cats,
} from "@prisma/client";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Modal, Checkbox } from "@mui/material";
import axios from "axios";
import { Button, menu } from "@material-tailwind/react";
import LocationsSelect from "@/components/LocationsSelect";
import MenuUpdate from "@/components/MenuUpdate";
import { LocationId } from "@/libs/locationId";
import MenuCatUpdate from "@/components/MenuCatUpdate";
import MenuCards from "@/components/MenuCards";

const MenuCatById = () => {
  const { menus, menuCategories, menusMenuCat, menusLocation } =
    useContext(AppContext);

  const router = useRouter();
  const { id } = router.query;

  const locationId = Number(LocationId());

  const currentMenuCat = menuCategories.filter(
    (item: menu_cats) => item.id === Number(id)
  )[0];

  const menuIds = menusLocation
    .filter((item: menus_locations) => item.location_id === locationId)
    .map((item: menus_locations) => item.menu_id);

  const getMenusByLocationIds = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const menusNotHaveLocationIds = menus
    .filter((item: menus) => !getMenusByLocationIds.includes(item))
    .map((item: menus) => item.id);

  const selectedMenuIds = menusMenuCat
    .filter((item: menus_menu_cats) => item.menu_cat_id === Number(id))
    .map((item: menus_menu_cats) => item.menu_id);

  const selectedMenus = getMenusByLocationIds.filter((item: menus) =>
    selectedMenuIds.includes(item.id)
  );

  return (
    <Layout>
      <div className="w-[10rem] h-[7rem] ml-[18rem] my-16 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
        <h1>{currentMenuCat?.menu_cat_name}</h1>
        <MenuCatUpdate
          menus={getMenusByLocationIds}
          selectedMenus={selectedMenus}
          menuNotHaveLocationIds={menusNotHaveLocationIds}
          menuCat={currentMenuCat}
        />
      </div>
      <MenuCards menus={selectedMenus} />
    </Layout>
  );
};

export default MenuCatById;
