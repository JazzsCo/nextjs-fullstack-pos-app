/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import ButtonSide from "./ButtonSide";
import Link from "next/link";
import type {
  menus as Menu,
  menu_cats as MenuCategory,
  addon_cats as AddonCategory,
  addons as Addon,
  addons_addon_cats as AddonAddonCat,
  menus_menu_cats_locations,
} from "@prisma/client";
import { useRouter } from "next/router";
import { LocationId } from "@/libs/locationId";

export default function Menus() {
  const locationId = LocationId() || "";

  const { locations } = useContext(AppContext);

  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [addonCategories, setAddonCategories] = useState<AddonCategory[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [menusMenuCatAddonCatLocation, setMenusMenuCatAddonCatLocation] =
    useState<menus_menu_cats_locations[]>([]);

  console.log("menu", menus);
  console.log("menu cat", menuCategories);
  console.log("addon cat", addonCategories);
  console.log("addons", addons);
  console.log("menusMenuCatAddonCatLocation", menusMenuCatAddonCatLocation);

  const getMenusByLocationId = async (id: string) => {
    const url = `/api/menusPost?id=${id}`;

    await axios
      .get(url)
      .then((res) => {
        const { menus, menuCategories, menusMenuCat, addonCategories, addons } =
          res.data;

        setMenus(menus);
        setMenuCategories(menuCategories);
        setMenusMenuCatAddonCatLocation(menusMenuCat);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    if (locations.length) {
      getMenusByLocationId(locationId);
    }
  }, [locations, locationId]);

  const menusCat = (id: number) => {
    const menuMenuCatIds = menusMenuCatAddonCatLocation
      .filter((menuCat) => menuCat.menu_id === id)
      .map((menuCat) => menuCat.menu_cat_id);

    const menuCatNames = menuCategories
      .filter((menuCat) => menuMenuCatIds.includes(menuCat.id))
      .map((menuCat) => menuCat.menu_cat_name);

    return (
      <div>
        {menuCatNames.map((menuCat, index) => (
          <div key={index}>{menuCat}</div>
        ))}
      </div>
    );
  };

  // const addonsCat = (id: number) => {
  //   const menuAddonCatIds = menusAddonCat
  //     .filter((addonCat) => addonCat.menu_id === id)
  //     .map((addonCat) => addonCat.addon_cat_id);

  //   const addonCatNames = addonCategories
  //     .filter((addonCat) => menuAddonCatIds.includes(addonCat.id))
  //     .map((addonCat) => addonCat.addon_cat_name);

  //   return (
  //     <div>
  //       {addonCatNames.map((addonCat, index) => (
  //         <div key={index}>{addonCat}</div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <Layout>
      <div>
        {menus &&
          menus.map((menu, index) => (
            <div key={index} className="flex flex-col items-center my-28">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="p-8 rounded-[2.5rem]"
                  src={menu.image_url}
                  alt="product image"
                />

                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {menu.name}
                  </h5>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${menu.price}
                    </span>
                    <div>
                      <ButtonSide
                        menu={menu}
                        menusCat={menusCat}
                        // addonsCat={addonsCat}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}
