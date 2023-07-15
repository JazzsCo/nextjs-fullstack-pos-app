// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { menus_addon_cats } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, menuIds } = req.body.addonCatName;

      const addonCat = await prisma.addon_cats.create({
        data: {
          addon_cat_name: name,
        },
      });

      const menusAddonCats = menuIds.map((id: number) => {
        return { menu_id: id, addon_cat_id: addonCat.id };
      });

      const newMenusAddonCats = await prisma.$transaction(
        menusAddonCats.map((menuAddonCat: any) =>
          prisma.menus_addon_cats.create({
            data: menuAddonCat,
          })
        )
      );

      res.status(200).send({ addonCat, newMenusAddonCats });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { menuId, addonCatName, menuNotHaveLocationIds } = req.body;

      await prisma.addon_cats.update({
        where: {
          id: Number(id),
        },
        data: {
          addon_cat_name: addonCatName,
        },
      });

      const validMenuId = (
        await prisma.menus_addon_cats.findMany({
          where: { addon_cat_id: Number(id) },
        })
      ).map((item: menus_addon_cats) => item.menu_id);

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
        const menuAddonCatUpdate = differentMenuIdUpdate.map(
          (menuId: number) => {
            return { addon_cat_id: Number(id), menu_id: menuId };
          }
        );

        await prisma.menus_addon_cats.createMany({
          data: menuAddonCatUpdate,
        });
      }

      if (differentMenuIdDelete.length > 0)
        await prisma.menus_addon_cats.deleteMany({
          where: {
            addon_cat_id: Number(id),
            menu_id: {
              in: differentMenuIdDelete,
              notIn: notDeleteMenuIds,
            },
          },
        });

      res.status(200).json({ test: "Im ok..." });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.send(400);

      const removeAddonCat = await prisma.addon_cats.update({
        data: { is_archived: true },
        where: { id: Number(id) },
      });

      return res.status(200).send({ removeAddonCat });
    }
  } catch (error) {
    console.log("error", error);
  }
}
