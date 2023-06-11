/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import type { menus, menus_locations } from "@prisma/client";
import { LocationId } from "@/libs/locationId";
import MenuForm from "@/components/MenuForm";

export default function Menus() {
  const locationId = Number(LocationId());

  const { menus, menusLocation } = useContext(AppContext);

  const menuIds = menusLocation
    .filter((item: menus_locations) => item.location_id === locationId)
    .map((item: menus_locations) => item.menu_id);

  const getMenusByLocationIds = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  // const menusCat = (id: number) => {
  //   const menuMenuCatIds = menusMenuCatAddonCatLocation
  //     .filter((menuCat) => menuCat.menu_id === id)
  //     .map((menuCat) => menuCat.menu_cat_id);

  //   const menuCatNames = menuCategories
  //     .filter((menuCat) => menuMenuCatIds.includes(menuCat.id))
  //     .map((menuCat) => menuCat.menu_cat_name);

  //   return (
  //     <div>
  //       {menuCatNames.map((menuCat, index) => (
  //         <div key={index}>{menuCat}</div>
  //       ))}
  //     </div>
  //   );
  // };

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
      <div className="absolute top-[5.5rem] right-10">
        <MenuForm />
      </div>
      <div className="flex my-16 gap-3 ml-[18rem] flex-wrap">
        {getMenusByLocationIds &&
          getMenusByLocationIds.map((menu: menus) => (
            <div
              key={menu.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
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
                    {/* <ButtonSide
                      menu={menu}
                      menusCat={menusCat}
                      // addonsCat={addonsCat}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}
