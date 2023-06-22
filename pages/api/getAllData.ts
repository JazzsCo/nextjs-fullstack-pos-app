// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const menus = await prisma.menus.findMany();
      const menuCategories = await prisma.menu_cats.findMany();
      const addonCategories = await prisma.addon_cats.findMany();
      const addons = await prisma.addons.findMany();
      const menusLocation = await prisma.menus_locations.findMany();

      const locations = await prisma.locations.findMany();
      const menusAddonCat = await prisma.menus_addon_cats.findMany();
      const addonAddonCat = await prisma.addons_addon_cats.findMany();
      const menusMenuCat = await prisma.menus_menu_cats.findMany();
      const tables = await prisma.tables.findMany();

      res.status(200).send({
        menus,
        menuCategories,
        addonCategories,
        addons,
        menusLocation,
        tables,
        locations,
        menusAddonCat,
        addonAddonCat,
        menusMenuCat,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
