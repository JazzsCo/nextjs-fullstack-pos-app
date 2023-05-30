import type { NextApiRequest, NextApiResponse } from "next";
import { pool, prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const result = await prisma.menu_categories.create({
        data: {
          category_name: name,
        },
      });

      res.send(result);
    }
  } catch (err) {
    console.log("error", err);
  }
}
