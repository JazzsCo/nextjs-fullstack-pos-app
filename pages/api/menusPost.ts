import type { NextApiRequest, NextApiResponse } from "next";
import { pool, prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const imageUrl = req.body.imageUrl;
      const { name, price, locationIds, menuCatIds, addonCatIds } =
        req.body.menu;

      const currentMenuId = (
        await prisma.menus.create({
          data: {
            name,
            price,
            image_url: imageUrl,
          },
        })
      ).id;

      const menuLocationsIds = locationIds.map((id: number) => {
        return { location_id: id, menu_id: currentMenuId };
      });

      await prisma.$transaction(
        menuLocationsIds.map((id: any) =>
          prisma.location_menus.create({
            data: id,
          })
        )
      );

      const menusMenuCatIds = menuCatIds.map((id: number) => {
        return { category_id: id, menus_id: currentMenuId };
      });

      await prisma.$transaction(
        menusMenuCatIds.map((id: any) =>
          prisma.menus_menu_categories.create({
            data: id,
          })
        )
      );

      const menuAddonCatIds = addonCatIds.map((id: number) => {
        return { addon_cat_id: id, menus_id: currentMenuId };
      });

      await prisma.$transaction(
        menuAddonCatIds.map((id: any) =>
          prisma.menus_addon_categories.create({
            data: id,
          })
        )
      );

      res.status(200).send("It ok");
    } else if (req.method === "PUT") {
      const { name, price } = req.body.menu;
      const id = req.query.id;
      const text = `UPDATE menus SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
      const values = [name, price, id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } else if (req.method === "GET") {
      const id = req.query.id;

      const menusIds = (
        await prisma.location_menus.findMany({
          where: {
            location_id: Number(id),
          },
        })
      ).map((item) => item.menu_id);

      const menus = await prisma.menus.findMany({
        where: {
          id: {
            in: menusIds,
          },
        },
      });

      const menusMenuCat = await prisma.menus_menu_categories.findMany({
        where: {
          menus_id: {
            in: menusIds,
          },
        },
      });

      const menuCategoriesIds = menusMenuCat.map((item) => item.category_id);

      const menuCategories = await prisma.menu_categories.findMany({
        where: {
          id: {
            in: menuCategoriesIds,
          },
        },
      });

      const menusAddonCat = await prisma.menus_addon_categories.findMany({
        where: {
          menus_id: {
            in: menusIds,
          },
        },
      });

      const addonCategoriesIds = menusAddonCat.map((item) => item.addon_cat_id);

      const addonCategories = await prisma.addon_categories.findMany({
        where: {
          id: {
            in: addonCategoriesIds,
          },
        },
      });

      const addonAddonCat = await prisma.addon_addon_categories.findMany({
        where: {
          addon_cat_id: {
            in: addonCategoriesIds,
          },
        },
      });

      const addonIds = addonAddonCat.map((item) => item.addon_id);

      const addons = await prisma.addon.findMany({
        where: {
          id: {
            in: addonIds,
          },
        },
      });

      res.send({
        menus,
        menuCategories,
        addonCategories,
        addons,
        addonAddonCat,
        menusAddonCat,
        menusMenuCat,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
