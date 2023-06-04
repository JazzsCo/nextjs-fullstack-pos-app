import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const result = await prisma.locations.create({
        data: {
          location_name: name,
        },
      });

      res.send("ok");
    } else if (req.method === "GET") {
      // const menuCategories = await prisma.menu_cats.findMany();

      // const addons = await prisma.addons.findMany();

      // const addonCategories = await prisma.addon_cats.findMany();

      const locations = await prisma.locations.findMany();

      res.send({
        // menuCategories,
        // addons,
        // addonCategories,
        locations,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
