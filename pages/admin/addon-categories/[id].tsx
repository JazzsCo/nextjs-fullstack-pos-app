import Layout from "@/components/Layout";
import { AppContext } from "@/contexts/AppContext";
import type { addon_cats, menus, menus_addon_cats } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { LocationId } from "@/libs/locationId";
import MenuCards from "@/components/MenuCards";
import { getMenuIdsByLocationId } from "@/libs/custom";
import AddonCatUpdate from "@/components/AddonCatUpdate";

const AddonCatById = () => {
  const { menus, addonCategories, menusAddonCat, menusLocation } =
    useContext(AppContext);

  const router = useRouter();
  const { id } = router.query;

  const locationId = Number(LocationId());

  const currentAddonCat = addonCategories.filter(
    (item: addon_cats) => item.id === Number(id)
  )[0];

  const menuIds = getMenuIdsByLocationId(locationId, menusLocation);

  const getMenusByLocationId = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const menusNotHaveLocationIds = menus
    .filter((item: menus) => !getMenusByLocationId.includes(item))
    .map((item: menus) => item.id);

  const selectedMenuIds = menusAddonCat
    .filter((item: menus_addon_cats) => item.addon_cat_id === Number(id))
    .map((item: menus_addon_cats) => item.menu_id);

  const selectedMenus = getMenusByLocationId.filter((item: menus) =>
    selectedMenuIds.includes(item.id)
  );

  return (
    <Layout>
      <div className="w-[10rem] h-[7rem] ml-[18rem] my-16 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
        <h1>{currentAddonCat?.addon_cat_name}</h1>
        <AddonCatUpdate
          menus={getMenusByLocationId}
          selectedMenus={selectedMenus}
          menuNotHaveLocationIds={menusNotHaveLocationIds}
          addonCat={currentAddonCat}
        />
      </div>
      <MenuCards menus={selectedMenus} />
    </Layout>
  );
};

export default AddonCatById;
