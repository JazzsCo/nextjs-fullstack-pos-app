interface IdAndName {
  id: number;
  name: string;
}

export interface Menu {
  id: number;
  menu_name: string;
  location_name: string;
  price: number;
  image_url: string;
}

export interface MenuCategory {
  id: number;
  category_name: string;
}

export interface AddonAddonCat {
  id: number;
  addon_id: number;
  addon_cat_id: number;
}

export interface MenusAddonCat {
  id: number;
  menus_id: number;
  addon_cat_id: number;
}

export interface MenusMenuCat {
  id: number;
  menus_id: number;
  category_id: number;
}

export interface Addon {
  id: number;
  addon_name: string;
  price: number;
}

export interface AddonCategory {
  id: number;
  category_name: string;
  isRequired: boolean;
}

export interface Location extends IdAndName {}
