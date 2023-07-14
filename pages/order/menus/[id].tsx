import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import { addon_cats, addons, addons_addon_cats, menus } from "@prisma/client";

import { Checkbox, Radio } from "@material-tailwind/react";

import { getAddonCatIdsByMenuId } from "@/libs/custom";
import { OrderContext } from "@/contexts/OrderContext";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { AddRoadRounded } from "@mui/icons-material";

const MenuById = () => {
  const router = useRouter();
  const id = router.query.id;

  const query = router.query;

  const {
    menus,
    addonCategories,
    addons,
    menusAddonCats,
    addonsAddonCats,
    carts,
  } = useAppSelector(appData);

  const { ...data } = useAppSelector(appData);

  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const [orderAddonIds, setOrderAddonIds] = useState<Number[]>([]);

  const selectedAddons = addons.filter((item) =>
    orderAddonIds.includes(item.id)
  );

  const currentMenu = menus.filter((item: menus) => item.id === Number(id))[0];

  const addonCatIds = getAddonCatIdsByMenuId(id, menusAddonCats);

  const addonCatsByMenu = addonCategories.filter((item: addon_cats) =>
    addonCatIds.includes(item.id)
  );

  const isRequiredAddonCats = addonCatsByMenu.filter(
    (item) => item.is_required === true
  );

  const addToCart = () => {
    // updateData({
    //   ...data,
    //   cart: [
    //     ...data.cart,
    //     {
    //       id: uuid(),
    //       menu: currentMenu,
    //       addons: selectedAddons,
    //       quantity,
    //     },
    //   ],
    // });

    delete query.id;

    router.push({
      pathname: "/order",
      query,
    });
  };

  const updateCartItem = carts.find((item) => item.menu.id === Number(id));

  const updateToCart = () => {
    if (updateCartItem) {
      const otherCartItem = carts.filter(
        (item) => item.id !== updateCartItem.id
      );

      // updateData({
      //   ...data,
      //   cart: [
      //     ...otherCartItem,
      //     {
      //       menu: currentMenu,
      //       addons: selectedAddons,
      //       quantity,
      //     },
      //   ],
      // });
    }

    delete query.id;

    router.push({
      pathname: "/order/cart",
      query,
    });
  };

  const orderAddonsChange = (selectedAddonId: number) => {
    const isRequiredAddonCatId = addonsAddonCats.filter(
      (item: addons_addon_cats) => item.addon_id === selectedAddonId
    )[0].addon_cat_id;

    const isRequiredAddonCat = addonCatsByMenu.filter(
      (item: addon_cats) => item.id === isRequiredAddonCatId
    )[0];

    const isRequiredAddonIds = addonsAddonCats
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
    const addonIdsByAddonCatId = addonsAddonCats
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

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  useEffect(() => {
    if (isRequiredAddonCats.length) {
      setDisabled(true);
    }

    if (updateCartItem) {
      const selectedCartItem = carts.find(
        (item) => item.menu.id === Number(id)
      );

      const selectedAddonsIds = selectedCartItem?.addons.map(
        (item) => item.id
      ) as Number[];

      setOrderAddonIds(selectedAddonsIds);

      const selectedQuantity = selectedCartItem?.quantity;

      selectedQuantity && setQuantity(selectedQuantity);
    }
  }, [updateCartItem]);

  useEffect(() => {
    const addonCatIdsByAddonIds = addonsAddonCats
      .filter((item) => orderAddonIds.includes(item.addon_id))
      .map((item) => item.addon_cat_id);

    const addonCats = addonCategories.filter((item) =>
      addonCatIdsByAddonIds.includes(item.id)
    );

    const requiredAddonCats = addonCats.filter(
      (item) => item.is_required === true
    );

    if (requiredAddonCats.length) {
      isRequiredAddonCats.every((item) => requiredAddonCats.includes(item))
        ? setDisabled(false)
        : null;
    }
  }, [orderAddonIds]);

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
        <div>
          <QuantitySelector
            value={quantity}
            onIncrease={handleQuantityIncrease}
            onDecrease={handleQuantityDecrease}
          />
        </div>
        <div>
          <Button
            onClick={updateCartItem ? updateToCart : addToCart}
            disabled={disabled}
            variant="contained"
          >
            {updateCartItem ? "UPDATE TO CART" : "ADD TO CART"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuById;
