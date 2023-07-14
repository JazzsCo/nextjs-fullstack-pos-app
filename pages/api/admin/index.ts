// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const menus = await prisma.menus.findMany({
        where: { is_archived: false },
      });

      const menuCategories = await prisma.menu_cats.findMany({
        where: { is_archived: false },
      });

      const addonCategories = await prisma.addon_cats.findMany({
        where: { is_archived: false },
      });

      const addons = await prisma.addons.findMany({
        where: { is_archived: false },
      });

      const locations = await prisma.locations.findMany({
        where: { is_archived: false },
      });

      const tables = await prisma.tables.findMany({
        where: { is_archived: false },
      });

      const menusLocations = await prisma.menus_locations.findMany();
      const menusAddonCats = await prisma.menus_addon_cats.findMany();
      const addonsAddonCats = await prisma.addons_addon_cats.findMany();
      const menusMenuCats = await prisma.menus_menu_cats.findMany();
      const orders = await prisma.orders.findMany();
      const orderlines = await prisma.orderlines.findMany();

      res.status(200).send({
        menus,
        menuCategories,
        addonCategories,
        addons,
        menusLocations,
        tables,
        locations,
        menusAddonCats,
        addonsAddonCats,
        menusMenuCats,
        orders,
        orderlines,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
