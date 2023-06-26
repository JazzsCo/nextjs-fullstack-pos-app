import { useContext } from "react";
import { useRouter } from "next/router";

import { addon_cats, addons, addons_addon_cats, menus } from "@prisma/client";

import { OrderContext } from "@/contexts/OrderContext";
import {
  getAddonCatIdsByMenuId,
  getAddonIdsByAddonCatIds,
} from "@/libs/custom";
import { Checkbox, Radio } from "@material-tailwind/react";

const MenuById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { menus, addonCategories, addons, menusAddonCat, addonAddonCat } =
    useContext(OrderContext);

  const currentMenu = menus.filter((item: menus) => item.id === Number(id))[0];

  const addonCatIds = getAddonCatIdsByMenuId(id, menusAddonCat);

  const addonCatsByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const addonIds = getAddonIdsByAddonCatIds(addonCatIds, addonAddonCat);

  const addonsByAddonCats = addons.filter((item: addons) =>
    addonIds.includes(item.id)
  );

  const addonsByAddonCat = (id: number, is_required: boolean) => {
    const addonIdsByAddonCatId = addonAddonCat
      .filter((item: addons_addon_cats) => item.addon_cat_id === id)
      .map((item: addons_addon_cats) => item.addon_id);

    const addonsByAddonCat = addons.filter((item: addons) =>
      addonIdsByAddonCatId.includes(item.id)
    );

    return (
      <div>
        {is_required ? (
          <div>
            <div className="bg-blue-gray-100 px-2 rounded-md mb-3">
              required
            </div>
            <div className="flex flex-col justify-center items-center -ml-44">
              {addonsByAddonCat.map(({ id, addon_name }) => (
                <Radio
                  key={id}
                  id={addon_name}
                  name="type"
                  label={addon_name}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-blue-gray-100 px-2 rounded-md mb-3">
              optional
            </div>
            <div className="flex flex-col justify-center items-center -ml-44">
              {addonsByAddonCat.map(({ id, addon_name }) => (
                <Checkbox
                  key={id}
                  id={addon_name}
                  label={addon_name}
                  ripple={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-4 ml-5 font-sans space-y-6">
      <h1>Menu Name: {currentMenu?.name}</h1>
      <div>
        {addonCatsByMenu.map(({ id, addon_cat_name, is_required }) => (
          <div key={id} className="flex space-x-16 mb-7">
            <h2>{addon_cat_name}</h2>
            <div>{addonsByAddonCat(id, is_required)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuById;
