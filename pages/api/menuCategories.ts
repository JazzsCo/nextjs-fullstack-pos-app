import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, menusIds } = req.body.menuCat;

      const menuCatId = (
        await prisma.menu_cats.create({
          data: {
            menu_cat_name: name,
          },
        })
      ).id;

      const menusMenuCats = menusIds.map((id: number) => {
        return { menu_id: id, menu_cat_id: menuCatId };
      });

      await prisma.menus_menu_cats.createMany({
        data: menusMenuCats,
      });

      res.status(200).send("Its ok");
    }
  } catch (err) {
    console.log("error", err);
  }
}
