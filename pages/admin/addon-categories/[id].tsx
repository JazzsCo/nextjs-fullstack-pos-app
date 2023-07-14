import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";

import { LocationId } from "@/libs/locationId";
import { AdminContext } from "@/contexts/AdminContext";
import { getMenuIdsByLocationId } from "@/libs/custom";

import Layout from "@/components/Layout";
import MenuCards from "@/components/MenuCards";
import DeleteDialog from "@/components/DeleteDialog";
import AddonCatUpdate from "@/components/AddonCatUpdate";

import type { addon_cats, menus, menus_addon_cats } from "@prisma/client";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const AddonCatById = () => {
  const { menus, addonCategories, menusAddonCats, menusLocations } =
    useAppSelector(appData);

  const router = useRouter();
  const { id } = router.query;

  const locationId = Number(LocationId());

  const currentAddonCat = addonCategories.filter(
    (item: addon_cats) => item.id === Number(id)
  )[0];

  const menuIds = getMenuIdsByLocationId(locationId, menusLocations);

  const getMenusByLocationId = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  const menusNotHaveLocationIds = menus
    .filter((item: menus) => !getMenusByLocationId.includes(item))
    .map((item: menus) => item.id);

  const selectedMenuIds = menusAddonCats
    .filter((item: menus_addon_cats) => item.addon_cat_id === Number(id))
    .map((item: menus_addon_cats) => item.menu_id);

  const selectedMenus = getMenusByLocationId.filter((item: menus) =>
    selectedMenuIds.includes(item.id)
  );

  const deleteAddonCat = async () => {
    await axios.delete(`/api/admin/addonCategories?id=${id}`);

    router.push("/admin/addon-categories");

    // fetchData();
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <div className="flex justify-around space-x-2 mr-2">
          <AddonCatUpdate
            menus={getMenusByLocationId}
            selectedMenus={selectedMenus}
            menuNotHaveLocationIds={menusNotHaveLocationIds}
            addonCat={currentAddonCat}
          />
          <DeleteDialog callback={deleteAddonCat} />
        </div>
      </div>
      <div className="w-[10rem] h-[7rem] ml-[18rem] my-16 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
        <h1>{currentAddonCat?.addon_cat_name}</h1>
      </div>
      <MenuCards menus={selectedMenus} />
    </Layout>
  );
};

export default AddonCatById;
