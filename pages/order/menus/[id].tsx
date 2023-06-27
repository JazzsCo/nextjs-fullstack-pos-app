import { useContext, useState } from "react";
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

  const [orderAddonIds, setOrderAddonIds] = useState<Number[]>([]);

  console.log(orderAddonIds);

  const currentMenu = menus.filter((item: menus) => item.id === Number(id))[0];

  const addonCatIds = getAddonCatIdsByMenuId(id, menusAddonCat);

  const addonCatsByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const orderAddonsChange = (selectedAddonId: number) => {
    const isRequiredAddonCatId = addonAddonCat.filter(
      (item: addons_addon_cats) => item.addon_id === selectedAddonId
    )[0].addon_cat_id;

    const isRequiredAddonCat = addonCatsByMenu.filter(
      (item: addon_cats) => item.id === isRequiredAddonCatId
    )[0];

    const isRequiredAddonIds = addonAddonCat
      .filter(
        (item: addons_addon_cats) => item.addon_cat_id === isRequiredAddonCatId
      )
      .map((item: addons_addon_cats) => item.addon_id);

    if (isRequiredAddonCat.is_required) {
      const resultBoolean = isRequiredAddonIds.every((addonId) => {
        return !orderAddonIds.includes(addonId);
      });

      resultBoolean
        ? setOrderAddonIds([...orderAddonIds, selectedAddonId])
        : setOrderAddonIds([
            ...orderAddonIds.filter(
              (id) => !isRequiredAddonIds.includes(Number(id))
            ),
            selectedAddonId,
          ]);
    } else {
      !orderAddonIds.includes(selectedAddonId)
        ? setOrderAddonIds([...orderAddonIds, selectedAddonId])
        : setOrderAddonIds(
            orderAddonIds.filter((id) => id !== selectedAddonId)
          );
    }
  };

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
                  value={id}
                  label={addon_name}
                  name={String(id)}
                  checked={
                    orderAddonIds.find(
                      (selectedAddonId) => selectedAddonId === id
                    )
                      ? true
                      : false
                  }
                  onChange={(e) => orderAddonsChange(Number(e.target.value))}
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
                  value={id}
                  label={addon_name}
                  checked={
                    orderAddonIds.find(
                      (selectedAddonId) => selectedAddonId === id
                    )
                      ? true
                      : false
                  }
                  onChange={(e) => orderAddonsChange(Number(e.target.value))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="mt-6 space-y-6">
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
    </div>
  );
};

export default MenuById;
