interface CategoryName {
  categoryName: string;
}

interface IdAndName {
  id: number;
  name: string;
}

export interface Menu {
  id: number;
  menu_name: string;
  location_name: string;
  available: boolean;
  price: number;
  url: string;
}

export interface MenuCategory extends CategoryName {}

export interface Addon {
  addonName: string;
  prize: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}

export interface AddonCategory extends CategoryName {
  isRequired: boolean;
}

export interface Location extends IdAndName {}
