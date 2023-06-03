import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const result = await prisma.locations.create({
        data: {
          location_name: name,
        },
      });

      res.send("ok");
    }
  } catch (err) {
    console.log("error", err);
  }
}
