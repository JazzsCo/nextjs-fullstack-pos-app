import {
  addons_addon_cats,
  menus_addon_cats,
  menus_locations,
  menus_menu_cats,
} from "@prisma/client";

export const getMenuIdsByLocationId = (
  locationId: number,
  menusLocation: menus_locations[]
) => {
  return menusLocation
    .filter((item: menus_locations) => item.location_id === locationId)
    .map((item: menus_locations) => item.menu_id);
};

export const getMenuCatIdsByMenuId = (
  id: string | string[] | undefined,
  menusMenuCat: menus_menu_cats[]
) => {
  return menusMenuCat
    .filter((item: menus_menu_cats) => item.menu_id === Number(id))
    .map((item: menus_menu_cats) => item.menu_cat_id);
};

export const getAddonCatIdsByMenuId = (
  id: string | string[] | undefined,
  menusAddonCat: menus_addon_cats[]
) => {
  return menusAddonCat
    .filter((item: menus_addon_cats) => item.menu_id === Number(id))
    .map((item: menus_addon_cats) => item.addon_cat_id);
};

export const getAddonIdsByAddonCatIds = (
  addonCatIds: number[],
  addonAddonCat: addons_addon_cats[]
) => {
  return addonAddonCat
    .filter((item: addons_addon_cats) =>
      addonCatIds.includes(item.addon_cat_id)
    )
    .map((item: addons_addon_cats) => item.addon_id);
};

export const getSelectedLocationIdsByMenuId = (
  id: string | string[] | undefined,
  menusLocation: menus_locations[]
) => {
  return menusLocation
    .filter((item: menus_locations) => item.menu_id === Number(id))
    .map((item: menus_locations) => item.location_id)
    .filter((item: any) => item) as number[];
};
