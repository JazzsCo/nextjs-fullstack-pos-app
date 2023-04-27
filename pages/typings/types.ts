interface CategoryName {
  categoryName: string;
}

interface IdAndName {
  id: number;
  name: string;
}

export interface Menus extends IdAndName {
  price: number;
  url: string;
  avilable: boolean;
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

export interface Locations extends IdAndName {}
