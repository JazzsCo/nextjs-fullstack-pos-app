// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool, prisma } from "@/libs/db";

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

      // const addonCatResult = await pool.query(
      //   "INSERT INTO addon_categories(category_name) values($1) RETURNING *",
      //   [addonCatName]
      // );

      // const currentAddonCatId = addonCatResult.rows[0].id;

      const addonCatResultId = await prisma.addon_categories.create({
        data: {
          category_name: addonCatName,
        },
      });

      console.log("hhhh", addonCatResultId);

      // const addonsResult = await pool.query(
      //   "INSERT INTO addon(addon_name, price) SELECT * FROM UNNEST ($1::text[], $2::int[]) RETURNING *",
      //   [addonName, addonPrice]
      // );

      // const currentAddonIdArray = addonsResult.rows.map((addon) => {
      //   return addon.id;
      // });

      // const newMenusLocationsData = [
      //   {
      //     addon_name: addonName.map((name: any) => name),
      //     price: addonPrice.map((price: any) => price),
      //   },
      // ];

      // const addonsResultIds = await prisma.$transaction(
      //   newMenusLocationsData.map((menuLocation) =>
      //     prisma.addon.create({
      //       data: menuLocation,
      //     })
      //   )
      // );

      const addonsResultIds = await prisma.addon.createMany({
        data: {
          addon_name: addonName,
          price: addonPrice,
        },
      });

      console.log("dhsdsld", addonsResultIds);

      // await pool.query(
      //   "INSERT INTO addon_addon_categories(addon_id, addon_cat_id) SELECT * FROM UNNESTte ($1::int[], $2::int[]) RETURNING *",
      //   [
      //     currentAddonIdArray,
      //     Array(currentAddonIdArray.length).fill(currentAddonCatId),
      //   ]
      // );

      res.send("ok");
    }
  } catch (error) {
    console.log("error", error);
  }
}
