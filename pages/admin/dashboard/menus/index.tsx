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
  menus_addon_cats as MenusAddonCat,
  menus_menu_cats as MenusMenuCat,
} from "@prisma/client";
import { useRouter } from "next/router";

export default function Menus() {
  const {
    locations,
    // menus,
    // menuCategories,
    // addonCategories,
    // addons,
    // menusAddonCat,
    // menusMenuCat,
    // addonAddonCat,
    updateData,
    ...data
  } = useContext(AppContext);

  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [addonCategories, setAddonCategories] = useState<AddonCategory[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [addonAddonCat, setAddonAddonCat] = useState<AddonAddonCat[]>([]);
  const [menusAddonCat, setMenusAddonCat] = useState<MenusAddonCat[]>([]);
  const [menusMenuCat, setMenusMenuCat] = useState<MenusMenuCat[]>([]);

  console.log("menu", menus);
  console.log("menu cat", menuCategories);
  console.log("addon cat", addonCategories);
  console.log("addons", addons);
  console.log("addon addon cat", addonAddonCat);
  console.log("menu addon cat", menusAddonCat);
  console.log("menu menu cat", menusMenuCat);

  const getMenusByLocationId = async (id: string) => {
    const url = `/api/menusPost?id=${id}`;

    await axios
      .get(url)
      .then((res) => {
        const {
          menus,
          menuCategories,
          addonCategories,
          addons,
          addonAddonCat,
          menusAddonCat,
          menusMenuCat,
        } = res.data;

        // updateData({
        //   locations,
        //   menus,
        //   menuCategories,
        //   addonCategories,
        //   addons,
        //   menusAddonCat,
        //   menusMenuCat,
        //   addonAddonCat,
        //   updateData,
        //   ...data,

        // });

        setMenus(menus);
        setMenuCategories(menuCategories);
        setAddonCategories(addonCategories);
        setAddons(addons);
        setAddonAddonCat(addonAddonCat);
        setMenusAddonCat(menusAddonCat);
        setMenusMenuCat(menusMenuCat);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    if (locations.length) {
      const locationId = localStorage.getItem("locationId");
      if (!locationId) {
        localStorage.setItem("locationId", String(locations[0].id));
        return;
      } else {
        getMenusByLocationId(locationId);
      }
    }
  }, [locations]);

  const menusCat = (id: number) => {
    const menuMenuCatIds = menusMenuCat
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

  const addonsCat = (id: number) => {
    const menuAddonCatIds = menusAddonCat
      .filter((addonCat) => addonCat.menu_id === id)
      .map((addonCat) => addonCat.addon_cat_id);

    const addonCatNames = addonCategories
      .filter((addonCat) => menuAddonCatIds.includes(addonCat.id))
      .map((addonCat) => addonCat.addon_cat_name);

    return (
      <div>
        {addonCatNames.map((addonCat, index) => (
          <div key={index}>{addonCat}</div>
        ))}
      </div>
    );
  };

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
                        addonsCat={addonsCat}
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
