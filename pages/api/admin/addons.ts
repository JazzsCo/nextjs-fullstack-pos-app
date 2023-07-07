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
      const { addonName, addonPrice } = req.body;
      const { addonIds } = req.body.addonCatName;

      // output addonsResult ==> [{addon_name: more rice, price: 333}] just like this
      const addonsResult = addonName.map((name: string, index: number) => {
        return { addon_name: name, price: addonPrice[index] };
      });

      const addonsResultIds = (
        await prisma.$transaction(
          addonsResult.map((addon: any) =>
            prisma.addons.create({
              data: addon,
            })
          )
        )
      ).map((addon) => addon.id);

      const resultIds = addonsResultIds.map((id: number) => {
        return { addon_id: id, addon_cat_id: addonIds[0] };
      });

      await prisma.$transaction(
        resultIds.map((id: any) =>
          prisma.addons_addon_cats.create({
            data: id,
          })
        )
      );

      res.status(200).send("ok");
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.send(400);

      await prisma.addons.update({
        data: { is_archived: true },
        where: { id: Number(id) },
      });

      return res.status(200).json({ ok: "There will be ok" });
    }
  } catch (error) {
    console.log("error", error);
  }
}
