import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { menus_menu_cats } from "@prisma/client";

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

      res.status(200).json({ text: "Its ok" });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { menuId, menuNotHaveLocationIds } = req.body;

      const validMenuId = (
        await prisma.menus_menu_cats.findMany({
          where: { menu_cat_id: Number(id) },
        })
      ).map((item: menus_menu_cats) => item.menu_id);

      const notDeleteMenuIds = validMenuId.filter((item: number) =>
        menuNotHaveLocationIds.includes(item)
      );

      console.log("sdskdjsdjsd", notDeleteMenuIds);

      const differentMenuIdUpdate = menuId.filter(
        (id: number) => !validMenuId.includes(id)
      );

      const differentMenuIdDelete = validMenuId.filter(
        (id: number) => !menuId.includes(id)
      );

      if (differentMenuIdUpdate.length > 0) {
        const menuMenuCatUpdate = differentMenuIdUpdate.map(
          (menuId: number) => {
            return { menu_cat_id: Number(id), menu_id: menuId };
          }
        );

        await prisma.menus_menu_cats.createMany({
          data: menuMenuCatUpdate,
        });
      }

      if (differentMenuIdDelete.length > 0)
        await prisma.menus_menu_cats.deleteMany({
          where: {
            menu_cat_id: Number(id),
            menu_id: {
              notIn: notDeleteMenuIds,
              in: differentMenuIdDelete,
            },
          },
        });

      res.status(200).json({ test: "Im ok..." });
    }
  } catch (err) {
    console.log("error", err);
  }
}
