// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { addons } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { addonName, addonPrice } = req.body;
      const { addonIds } = req.body.addonCatName;

      // output addonsResult ==> [{addon_name: more rice, price: 333}] just like this
      const resultAddons = addonName.map((name: string, index: number) => {
        return { addon_name: name, price: addonPrice[index] };
      });

      const addons = await prisma.$transaction(
        resultAddons.map((addon: addons) =>
          prisma.addons.create({
            data: addon,
          })
        )
      );

      const addonsAddonCats = addons.map((item: addons) => {
        return { addon_id: item.id, addon_cat_id: addonIds[0] };
      });

      const newAddonsAddonCats = await prisma.$transaction(
        addonsAddonCats.map((item: any) =>
          prisma.addons_addon_cats.create({
            data: item,
          })
        )
      );

      res.status(200).send({ addons, newAddonsAddonCats });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.send(400);

      const deleteAddon = await prisma.addons.update({
        data: { is_archived: true },
        where: { id: Number(id) },
      });

      return res.status(200).send({ deleteAddon });
    }
  } catch (error) {
    console.log("error", error);
  }
}
