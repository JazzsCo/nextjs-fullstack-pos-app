interface CategoryName {
  categoryName: string;
}

export interface Menus {
  id?: string;
  name: string;
  prize: number;
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
