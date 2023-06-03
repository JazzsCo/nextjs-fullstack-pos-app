// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const menuCategories = await prisma.menu_cats.findMany();

      const addons = await prisma.addons.findMany();

      const addonCategories = await prisma.addon_cats.findMany();

      const locations = await prisma.locations.findMany();

      res.send({
        menuCategories,
        addons,
        addonCategories,
        locations,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
