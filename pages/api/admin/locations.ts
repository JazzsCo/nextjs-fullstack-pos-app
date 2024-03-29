import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const location = await prisma.locations.create({
        data: {
          location_name: name,
        },
      });

      res.status(200).send({ location });
    } else if (req.method === "GET") {
      const locations = await prisma.locations.findMany();

      res.send({
        locations,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
