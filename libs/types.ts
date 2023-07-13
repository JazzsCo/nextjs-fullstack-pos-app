import type { menus as Menu, addons as Addon } from "@prisma/client";

export enum OrderlineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
  REJECTED = "REJECTED",
}

export interface CartItem {
  id: string;
  menu: Menu;
  addons: Addon[];
  quantity: number;
}
