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

      // const menus = await pool.query(
      //   `SELECT menus.id, menus.name AS menu_name, price, image_url, locations.name AS location_name FROM MENUS
      //   INNER JOIN location_menus on location_menus.menu_id = menus.id
      //   INNER JOIN locations on locations.id = location_menus.location_id
      //   WHERE locations.id = $1`,
      //   [id]
      // );

      // const menusIds = menus.rows.map((menu) => menu.id) as number[];

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

      // const menusMenuCategoriesResult = await pool.query(
      //   "select * from menus_menu_categories where menus_id = ANY($1::int[])",
      //   [menusIds]
      // );

      // const menuCategoryIds = menusMenuCategoriesResult.rows.map(
      //   (row) => row.category_id
      // ) as number[];

      // const menuCategoriesResult = await pool.query(
      //   "select * from menu_categories where  id = ANY($1::int[])",
      //   [menuCategoryIds]
      // );

      const menuCategoriesIds = (
        await prisma.menus_menu_categories.findMany({
          where: {
            menus_id: {
              in: menusIds,
            },
          },
        })
      ).map((item) => item.category_id);

      const menuCategories = await prisma.menu_categories.findMany({
        where: {
          id: {
            in: menuCategoriesIds,
          },
        },
      });

      // const menusAddonCategoriesResult = await pool.query(
      //   "select * from menus_addon_categories where menus_id = ANY($1::int[])",
      //   [menusIds]
      // );

      // const addonCategoryIds = menusAddonCategoriesResult.rows.map(
      //   (row) => row.addon_cat_id
      // ) as number[];

      // const addonCategoriesResult = await pool.query(
      //   "select * from addon_categories where id = ANY($1::int[])",
      //   [addonCategoryIds]
      // );

      const addonCategoriesIds = (
        await prisma.menus_addon_categories.findMany({
          where: {
            menus_id: {
              in: menusIds,
            },
          },
        })
      ).map((item) => item.addon_cat_id);

      const addonCategories = await prisma.addon_categories.findMany({
        where: {
          id: {
            in: addonCategoriesIds,
          },
        },
      });

      // const addonAddonCategoriesResult = await pool.query(
      //   "select * from addon_addon_categories where addon_cat_id = ANY($1::int[])",
      //   [addonCategoryIds]
      // );

      // const addonIds = addonAddonCategoriesResult.rows.map(
      //   (row) => row.addon_id
      // ) as number[];

      // const addonsResult = await pool.query(
      //   "select * from addon where id = ANY($1::int[])",
      //   [addonIds]
      // );

      const addonIds = (
        await prisma.addon_addon_categories.findMany({
          where: {
            addon_cat_id: {
              in: addonCategoriesIds,
            },
          },
        })
      ).map((item) => item.addon_id);

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
        // addonAddonCat: addonAddonCategoriesResult.rows,
        // menusAddonCat: menusAddonCategoriesResult.rows,
        // menusMenuCat: menusMenuCategoriesResult.rows,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
