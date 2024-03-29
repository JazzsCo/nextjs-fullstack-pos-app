import Link from "next/link";
import { useContext } from "react";
import { addon_cats, menus, menus_addon_cats } from "@prisma/client";

import Layout from "@/components/Layout";
import AddonCatCreate from "@/components/AddonCatCreate";

import { LocationId } from "@/libs/locationId";
import { AdminContext } from "@/contexts/AdminContext";
import { getAddonCatIdsByMenuIds, getMenuIdsByLocationId } from "@/libs/custom";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const AddonCategory = () => {
  const locationId = Number(LocationId());

  const { menus, addonCategories, menusAddonCats, menusLocations } =
    useAppSelector(appData);

  const menuIds = getMenuIdsByLocationId(locationId, menusLocations);

  const getMenusByLocationIds = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const addonCatIds = getAddonCatIdsByMenuIds(menuIds, menusAddonCats);

  const getAddonCatByMenuIds = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const menuCountByAddonCatIds = (id: number) => {
    const menuIdByAddonCat = menusAddonCats
      .filter((item: menus_addon_cats) => item.addon_cat_id === id)
      .map((item: menus_addon_cats) => item.menu_id);

    const count = menuIds.filter((item: number) =>
      menuIdByAddonCat.includes(item)
    );

    return count.length;
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <AddonCatCreate menu={getMenusByLocationIds} />
      </div>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {getAddonCatByMenuIds.map((item: addon_cats) => (
          <Link
            className="flex flex-wrap"
            key={item.id}
            href={`/admin/addon-categories/${item.id}`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-[10rem] h-[7rem] cursor-pointer hover:bg-blue-gray-400 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
                <h1>{menuCountByAddonCatIds(item.id)} menus</h1>
              </div>
              <h1>{item.addon_cat_name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default AddonCategory;
