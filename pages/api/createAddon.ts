// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { addonCatName, addonName, addonPrice } = req.body;

      console.log(addonCatName);
      console.log(addonName);
      console.log(addonPrice);

      const addonCatResultId = (
        await prisma.addon_cats.create({
          data: {
            cat_name: addonCatName,
          },
        })
      ).id;

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
        return { addon_id: id, addon_cat_id: addonCatResultId };
      });

      await prisma.$transaction(
        resultIds.map((id: any) =>
          prisma.addons_addon_cats.create({
            data: id,
          })
        )
      );

      res.status(200).send("ok");
    }
  } catch (error) {
    console.log("error", error);
  }
}
