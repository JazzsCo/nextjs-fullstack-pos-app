import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { menus_locations } from "@prisma/client";

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
      const { id } = req.query;
      const { locationId } = req.body;

      const validLocationId = (
        await prisma.menus_locations.findMany({
          where: { menu_id: Number(id) },
        })
      )
        .map((item: menus_locations) => item.location_id)
        .map((item: any) => item) as number[];

      const differentLocationIdUpdate = locationId.filter(
        (id: number) => !validLocationId.includes(id)
      );

      const differentLocationIdDelete = validLocationId.filter(
        (id: number) => !locationId.includes(id)
      );

      if (differentLocationIdUpdate.length > 0) {
        const menuLocationUpdate = differentLocationIdUpdate.map(
          (locId: number) => {
            return { menu_id: Number(id), location_id: locId };
          }
        );

        await prisma.menus_locations.createMany({
          data: menuLocationUpdate,
        });
      }

      if (differentLocationIdDelete.length > 0)
        await prisma.menus_locations.deleteMany({
          where: {
            menu_id: Number(id),
            location_id: {
              in: differentLocationIdDelete,
            },
          },
        });

      res.status(200).json({ test: "Im ok..." });
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
        menusMenuCat,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
