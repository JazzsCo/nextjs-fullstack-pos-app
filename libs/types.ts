import type { menus as Menu, addons as Addon } from "@prisma/client";

export enum OrderlineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
}

export interface Orderline {
  menu: Menu;
  addon?: Addon[];
  quantity: number;
  status: OrderlineStatus;
}

export interface Order {
  id?: number;
  isPaid: boolean;
  tableId: number;
  orderLines: Orderline[];
}
