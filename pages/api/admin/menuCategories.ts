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

      const menuCat = await prisma.menu_cats.create({
        data: {
          menu_cat_name: name,
        },
      });

      const menusMenuCats = menusIds.map((id: number) => {
        return { menu_id: id, menu_cat_id: menuCat.id };
      });

      const newMenusMenuCats = await prisma.$transaction(
        menusMenuCats.map((menuMenuCat: any) =>
          prisma.menus_menu_cats.create({
            data: menuMenuCat,
          })
        )
      );

      res.status(200).send({ menuCat, newMenusMenuCats });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { menuId, menuCatName, menuNotHaveLocationIds } = req.body;

      const updateMenucat = await prisma.menu_cats.update({
        where: {
          id: Number(id),
        },
        data: {
          menu_cat_name: menuCatName,
        },
      });

      const validMenuId = (
        await prisma.menus_menu_cats.findMany({
          where: { menu_cat_id: Number(id) },
        })
      ).map((item: menus_menu_cats) => item.menu_id);

      const notDeleteMenuIds = validMenuId.filter((item: number) =>
        menuNotHaveLocationIds.includes(item)
      );

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
              in: differentMenuIdDelete,
              notIn: notDeleteMenuIds,
            },
          },
        });

      const menusMenuCats = await prisma.menus_menu_cats.findMany();

      res.status(200).json({ updateMenucat, menusMenuCats });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.send(400);

      const deleteMenuCat = await prisma.menu_cats.update({
        data: { is_archived: true },
        where: { id: Number(id) },
      });

      return res.status(200).send({ deleteMenuCat });
    }
  } catch (err) {
    console.log("error", err);
  }
}
