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
import { Button } from "@material-tailwind/react";
import LocationsSelect from "@/components/LocationsSelect";
import MenuUpdate from "@/components/MenuUpdate";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  borderColor: "white",
  p: 4,
};

const MenuById = () => {
  const {
    menus,
    menuCategories,
    addonCategories,
    locations,
    menusMenuCat,
    addonAddonCat,
    addons,
    menusAddonCat,
    menusLocation,
    fetchData,
  } = useContext(AppContext);

  const router = useRouter();
  const { id } = router.query;

  const currentMenu = menus.filter((item: menus) => item.id === Number(id))[0];

  const menuCatIds = menusMenuCat
    .filter((item: menus_menu_cats) => item.menu_id === Number(id))
    .map((item: menus_menu_cats) => item.menu_cat_id);

  const menuCatByMenu = menuCategories.filter((item: menu_cats) =>
    menuCatIds.includes(item.id)
  );

  const addonCatIds = menusAddonCat
    .filter((item: menus_addon_cats) => item.menu_id === Number(id))
    .map((item: menus_addon_cats) => item.addon_cat_id);

  const addonCatByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const addonIds = addonAddonCat
    .filter((item: addons_addon_cats) =>
      addonCatIds.includes(item.addon_cat_id)
    )
    .map((item: addons_addon_cats) => item.addon_id);

  const addonByAddonCat = addons.filter((item: addons) =>
    addonIds.includes(item.id)
  );

  const currentLocationIds = menusLocation
    .filter((item: menus_locations) => item.menu_id === Number(id))
    .map((item: menus_locations) => item.location_id)
    .filter((item: any) => item) as number[];

  const currentLocation = locations.filter((item: locations) =>
    currentLocationIds.includes(item.id)
  );
  // .map((item: locations) => item.location_name);

  return (
    <Layout>
      <div className="flex my-16 gap-3 ml-[18rem] flex-wrap">
        <div className="w-full max-w-sm bg-white hover:bg-gray-100 border border-gray-200 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="p-8 rounded-[2.5rem]"
            src={currentMenu?.image_url}
            alt="product image"
          />

          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {currentMenu?.name}
            </h5>

            <div className="flex flex-col float-left space-y-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${currentMenu?.price}
              </span>

              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Menu Categry
              </h5>

              <div>
                {menuCatByMenu.map((item: menu_cats) => (
                  <span
                    key={item.id}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {item.menu_cat_name}
                  </span>
                ))}
              </div>

              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Addon Categry
              </h5>

              <div>
                {addonCatByMenu.map((item: addon_cats) => (
                  <span
                    key={item.id}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {item.addon_cat_name}
                  </span>
                ))}
              </div>

              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Addon
              </h5>

              <div>
                {addonByAddonCat.map((item: addons) => (
                  <span
                    key={item.id}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {item.addon_name}
                  </span>
                ))}
              </div>

              <MenuUpdate menu={currentMenu} location={currentLocation} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenuById;
