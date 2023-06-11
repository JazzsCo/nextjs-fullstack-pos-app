// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { menus_addon_cats, menus_locations } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, menuIds } = req.body.addonCatName;

      const addonCatResultId = (
        await prisma.addon_cats.create({
          data: {
            addon_cat_name: name,
          },
        })
      ).id;

      const menuAddonCat = menuIds.map((id: number) => {
        return { menu_id: id, addon_cat_id: addonCatResultId };
      });

      await prisma.menus_addon_cats.createMany({
        data: menuAddonCat,
      });

      res.status(200).send("ok");
    } else if (req.method === "GET") {
      // const { id } = req.query;
      // console.log("id : ", id);
      // const menuIds = (
      //   await prisma.menus_menu_cats_locations.findMany({
      //     where: {
      //       location_id: Number(id),
      //     },
      //   })
      // )
      //   .map((item: menus_menu_cats_locations) => item.menu_id)
      //   .filter((item: any) => typeof item === "number") as number[];
      // console.log("menids : ", menuIds);
      // const addonCatIds = (
      //   await prisma.menus_addon_cats.findMany({
      //     where: {
      //       menu_id: {
      //         in: menuIds,
      //       },
      //     },
      //   })
      // ).map((item: menus_addon_cats) => item.addon_cat_id);
      // console.log("addonCatIds : ", addonCatIds);
      // const addonCategories = await prisma.addon_cats.findMany({
      //   where: {
      //     id: {
      //       in: addonCatIds,
      //     },
      //   },
      // });
      // console.log("addonCategories : ", addonCategories);
      // res.status(200).send({ addonCategories });
    }
  } catch (error) {
    console.log("error", error);
  }
}
