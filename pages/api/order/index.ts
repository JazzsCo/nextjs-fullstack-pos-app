// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/libs/db";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  OrderStatus,
  type menus,
  type addons_addon_cats,
  type menus_addon_cats,
  type menus_locations,
  type menus_menu_cats,
} from "@prisma/client";
import { getOrdersTotalPrice } from "@/libs/custom";
import { CartItem } from "@/libs/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const locationId = Number(req.query.locationId);

      if (!locationId) return res.send(400);

      const location = await prisma.locations.findFirst({
        where: { id: locationId },
      });

      const menusLocation = await prisma.menus_locations.findMany({
        where: {
          location_id: locationId,
        },
      });

      const menuIds = menusLocation.map(
        (item: menus_locations) => item.menu_id
      );

      const menusMenuCat = await prisma.menus_menu_cats.findMany({
        where: {
          menu_id: {
            in: menuIds,
          },
        },
      });

      const menuCatIds = menusMenuCat.map(
        (item: menus_menu_cats) => item.menu_cat_id
      );

      const menusAddonCat = await prisma.menus_addon_cats.findMany({
        where: {
          menu_id: {
            in: menuIds,
          },
        },
      });

      const addonCatIds = menusAddonCat.map(
        (item: menus_addon_cats) => item.addon_cat_id
      );

      const addonAddonCat = await prisma.addons_addon_cats.findMany({
        where: {
          addon_cat_id: {
            in: addonCatIds,
          },
        },
      });

      const addonIds = addonAddonCat.map(
        (item: addons_addon_cats) => item.addon_id
      );

      const menus = await prisma.menus.findMany({
        where: { id: { in: menuIds }, is_archived: false },
      });

      const menuCategories = await prisma.menu_cats.findMany({
        where: { id: { in: menuCatIds }, is_archived: false },
      });

      const addonCategories = await prisma.addon_cats.findMany({
        where: { id: { in: addonCatIds }, is_archived: false },
      });

      const addons = await prisma.addons.findMany({
        where: { id: { in: addonIds }, is_archived: false },
      });

      const orders = await prisma.orders.findMany({
        where: {
          locations_id: locationId,
        },
      });

      const orderlines = await prisma.orderlines.findMany({
        where: {
          orders_id: {
            in: orders.map((item) => item.id),
          },
        },
      });

      res.send({
        menus,
        menuCategories,
        addonCategories,
        addons,
        menusLocation,
        menusMenuCat,
        locations: [location],
        menusAddonCat,
        addonAddonCat,
        orders,
        orderlines,
      });
    } else if (req.method === "POST") {
      const { locationId, tableId } = req.query;

      const { carts } = req.body;

      const order = await prisma.orders.create({
        data: {
          locations_id: Number(locationId),
          tables_id: Number(tableId),
          price: getOrdersTotalPrice(carts),
        },
      });

      await carts.forEach(async (orderline: any) => {
        const menu = orderline.menu;
        const hasAddons = orderline.addons.length;

        if (hasAddons) {
          const addons = orderline.addons;
          const orderlineData = addons.map((item: any) => ({
            menu_id: menu.id,
            addons_id: item.id,
            orders_id: order.id,
            quantity: orderline.quantity,
            order_status: OrderStatus.PENDING,
          }));

          await prisma.orderlines.createMany({ data: orderlineData });
        } else {
          await prisma.orderlines.create({
            data: {
              menu_id: menu.id,
              orders_id: order.id,
              quantity: orderline.quantity,
              order_status: OrderStatus.PENDING,
            },
          });
        }
      });

      const orderlines = await prisma.orderlines.findMany();

      res.status(200).send({ order, orderlines });
    }
  } catch (error) {
    console.log(error);
  }
}
