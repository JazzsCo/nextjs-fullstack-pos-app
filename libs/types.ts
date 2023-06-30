import type { menus as Menu, addons as Addon } from "@prisma/client";

export enum OrderlineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
}

export interface Orderline {
  menu: Menu;
  addons: Addon[];
  quantity?: number;
}
