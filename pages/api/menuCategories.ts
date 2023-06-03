import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const result = await prisma.menu_cats.create({
        data: {
          menu_cat_name: name,
        },
      });

      res.send(result);
    }
  } catch (err) {
    console.log("error", err);
  }
}
