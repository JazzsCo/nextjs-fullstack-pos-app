import Link from "next/link";

import Layout from "@/components/Layout";
import { LocationId } from "@/libs/locationId";
import AddonCreate from "@/components/AddonCreate";
import { addon_cats, addons } from "@prisma/client";
import {
  getAddonCatIdsByMenuIds,
  getAddonIdsByAddonCatIds,
  getMenuIdsByLocationId,
} from "@/libs/custom";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const CreateAddons = () => {
  const locationId = Number(LocationId());

  const {
    addonCategories,
    addons,
    menusAddonCats,
    addonsAddonCats,
    menusLocations,
  } = useAppSelector(appData);

  const menuIds = getMenuIdsByLocationId(locationId, menusLocations);

  const addonCatIds = getAddonCatIdsByMenuIds(menuIds, menusAddonCats);

  const addonCatByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const getAddonByAddonCatIds = getAddonIdsByAddonCatIds(
    addonCatIds,
    addonsAddonCats
  );

  const addonByAddonCat = addons.filter((item: addons) =>
    getAddonByAddonCatIds.includes(item.id)
  );

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <AddonCreate addonCategories={addonCatByMenu} />
      </div>
      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {addonByAddonCat.map((item: addons) => (
          <Link key={item.id} href={`/admin/addons/${item.id}`}>
            <div className="w-[10rem] h-[7rem] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-gray-400 bg-blue-gray-200 rounded-md">
              <h1>{item.addon_name}</h1>
            </div>
          </Link>
        ))}
      </div>
      d
    </Layout>
  );
};

export default CreateAddons;
