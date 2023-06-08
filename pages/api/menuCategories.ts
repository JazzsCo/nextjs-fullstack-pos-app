import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, locationIds } = req.body.menuCat;

      const menuCatId = (
        await prisma.menu_cats.create({
          data: {
            menu_cat_name: name,
          },
        })
      ).id;

      const menuCatLocationsIds = locationIds.map((id: number) => {
        return { location_id: id, menu_cat_id: menuCatId };
      });

      await prisma.$transaction(
        menuCatLocationsIds.map((id: any) =>
          prisma.menus_menu_cats_locations.create({
            data: id,
          })
        )
      );

      res.status(200).send("Its ok");
    }
  } catch (err) {
    console.log("error", err);
  }
}
