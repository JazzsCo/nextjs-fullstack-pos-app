import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const imageUrl = req.body.imageUrl;
      const { name, price, locationIds } = req.body.menu;

      const currentMenuId = (
        await prisma.menus.create({
          data: {
            name,
            price,
            image_url: imageUrl,
          },
        })
      ).id;

      const menuLocations = locationIds.map((locId: number) => {
        return {
          location_id: locId,
          menu_id: currentMenuId,
        };
      });

      await prisma.menus_locations.createMany({
        data: menuLocations,
      });

      res.status(200).send("It ok");
    } else if (req.method === "PUT") {
      // const { name, price } = req.body.menu;
      // const id = req.query.id;
      // const text = `UPDATE menus SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
      // const values = [name, price, id];
      // const { rows } = await pool.query(text, values);
      // res.send(rows);
    } else if (req.method === "GET") {
      const id = req.query.id;

      const menusIds = (
        await prisma.menus_locations.findMany({
          where: {
            location_id: Number(id),
          },
        })
      )
        .map((item) => item.menu_id)
        .filter((item) => typeof item === "number") as number[];

      const menus = await prisma.menus.findMany({
        where: {
          id: {
            in: menusIds,
          },
        },
      });

      const menusMenuCat = await prisma.menus_locations.findMany({
        where: {
          menu_id: {
            in: menusIds,
          },
        },
      });

      // const menuCategoriesIds = menusMenuCat
      //   .map((item) => item.menu_cat_id)
      //   .filter((item) => typeof item === "number") as number[];

      // const menuCategories = await prisma.menu_cats.findMany({
      //   where: {
      //     id: {
      //       in: menuCategoriesIds,
      //     },
      //   },
      // });

      // const menusAddonCat =
      //   await prisma.menus_menu_cats_locations.findMany({
      //     where: {
      //       menu_id: {
      //         in: menusIds,
      //       },
      //     },
      //   });

      // const addonCategoriesIds = menusAddonCat
      //   .map((item) => item.addon_cat_id)
      //   .filter((item) => typeof item === "number") as number[];

      // const addonCategories = await prisma.addon_cats.findMany({
      //   where: {
      //     id: {
      //       in: addonCategoriesIds,
      //     },
      //   },
      // });

      // const addonAddonCat = await prisma.addons_addon_cats.findMany({
      //   where: {
      //     addon_cat_id: {
      //       in: addonCategoriesIds,
      //     },
      //   },
      // });

      // const addonIds = addonAddonCat.map((item) => item.addon_id);

      // const addons = await prisma.addons.findMany({
      //   where: {
      //     id: {
      //       in: addonIds,
      //     },
      //   },
      // });

      res.send({
        menus,
        // menuCategories,
        // addonCategories,
        // addons,
        // addonAddonCat,
        // menusAddonCat,
        menusMenuCat,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
