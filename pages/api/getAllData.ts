// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // const menusIds = (
      //   await prisma.menus_locations.findMany({
      //     where: {
      //       location_id: Number(id),
      //     },
      //   })
      // ).map((item) => item.menu_id);

      // const menus = await prisma.menus.findMany({
      //   where: {
      //     id: {
      //       in: menusIds,
      //     },
      //   },
      // });

      // const menuCatAddonCatLocation =
      //   await prisma.menus_menu_cats_addon_cats_locations.findMany({
      //     where: {
      //       location_id: Number(id),
      //     },
      //   });

      // const menuCatIds = menuCatAddonCatLocation
      //   .map((item) => item.menu_cat_id)
      //   .filter((item) => typeof item === "number") as number[];

      // console.log("@@@@@@@");
      // console.log("dkslds", menuCatIds);

      // const addonCatIds = menuCatAddonCatLocation
      //   .map((item) => item.addon_cat_id)
      //   .filter((item) => typeof item === "number") as number[];

      // const menuCategories = await prisma.menu_cats.findMany({
      //   where: {
      //     id: {
      //       in: menuCatIds,
      //     },
      //   },
      // });

      // const addonCategories = await prisma.addon_cats.findMany({
      //   where: {
      //     id: {
      //       in: addonCatIds,
      //     },
      //   },
      // });

      //  const menusMenuCat = await prisma.menus_menu_cats.findMany({
      //    where: {
      //      menu_id: {
      //        in: menusIds,
      //      },
      //    },
      //  });

      //  const menuCategoriesIds = menusMenuCat.map((item) => item.menu_cat_id);

      //  const menuCategories = await prisma.menu_cats.findMany({
      //    where: {
      //      id: {
      //        in: menuCategoriesIds,
      //      },
      //    },
      //  });

      //  const menusAddonCat = await prisma.menus_addon_cats.findMany({
      //    where: {
      //      menu_id: {
      //        in: menusIds,
      //      },
      //    },
      //  });

      //  const addonCategoriesIds = menusAddonCat.map(
      //    (item) => item.addon_cat_id
      //  );

      //  const addonCategories = await prisma.addon_cats.findMany({
      //    where: {
      //      id: {
      //        in: addonCategoriesIds,
      //      },
      //    },
      //  });

      //  const addonAddonCat = await prisma.addons_addon_cats.findMany({
      //    where: {
      //      addon_cat_id: {
      //        in: addonCategoriesIds,
      //      },
      //    },
      //  });

      //  const addonIds = addonAddonCat.map((item) => item.addon_id);

      //  const addons = await prisma.addons.findMany({
      //    where: {
      //      id: {
      //        in: addonIds,
      //      },
      //    },
      //  });

      const menus = await prisma.menus.findMany();
      const menuCategories = await prisma.menu_cats.findMany();
      const addonCategories = await prisma.addon_cats.findMany();
      const addons = await prisma.addons.findMany();
      const menusMenuCatAddonCatLocation =
        await prisma.menus_menu_cats_addon_cats_locations.findMany();

      const locations = await prisma.locations.findMany();

      res.status(200).send({
        menus,
        menuCategories,
        addonCategories,
        addons,
        menusMenuCatAddonCatLocation,
        locations,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
