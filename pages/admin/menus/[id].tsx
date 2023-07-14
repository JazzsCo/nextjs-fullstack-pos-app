import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AdminContext } from "@/contexts/AdminContext";
import type {
  menus,
  addon_cats,
  addons,
  locations,
  menu_cats,
} from "@prisma/client";

import Layout from "@/components/Layout";
import MenuUpdate from "@/components/MenuUpdate";
import DeleteDialog from "@/components/DeleteDialog";
import {
  getAddonCatIdsByMenuId,
  getAddonIdsByAddonCatIds,
  getMenuCatIdsByMenuId,
  getSelectedLocationIdsByMenuId,
} from "@/libs/custom";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const MenuById = () => {
  const {
    menus,
    menuCategories,
    addonCategories,
    locations,
    menusMenuCats,
    addonsAddonCats,
    addons,
    menusAddonCats,
    menusLocations,
  } = useAppSelector(appData);

  const router = useRouter();
  const { id } = router.query;

  const currentMenu = menus.filter((item: menus) => item.id === Number(id))[0];

  const menuCatIds = getMenuCatIdsByMenuId(id, menusMenuCats);

  const menuCatByMenu = menuCategories.filter((item: menu_cats) =>
    menuCatIds.includes(item.id)
  );

  const addonCatIds = getAddonCatIdsByMenuId(id, menusAddonCats);

  const addonCatByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const addonIds = getAddonIdsByAddonCatIds(addonCatIds, addonsAddonCats);

  const addonByAddonCat = addons.filter((item: addons) =>
    addonIds.includes(item.id)
  );

  const selectedLocationIds = getSelectedLocationIdsByMenuId(
    id,
    menusLocations
  );

  const selectedLocation = locations.filter((item: locations) =>
    selectedLocationIds.includes(item.id)
  );

  const deleteMenu = async () => {
    await axios.delete(`/api/admin/menus?id=${id}`);

    router.push("/admin/menus");

    // fetchData();
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <div className="flex justify-around space-x-2 mr-2">
          <DeleteDialog callback={deleteMenu} />
        </div>
      </div>
      <div className="flex my-16 gap-3 ml-[18rem] flex-wrap">
        <div className="w-full max-w-sm h-auto bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="p-8 rounded-[2.5rem] max-w-[18rem]"
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

              <MenuUpdate menu={currentMenu} location={selectedLocation} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenuById;
