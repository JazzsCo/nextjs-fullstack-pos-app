// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { menus_addon_cats, menus_locations } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { orderId, menuId } = req.query;
      const { status } = req.body;

      await prisma.orderlines.updateMany({
        data: {
          order_status: status,
        },
        where: {
          orders_id: Number(orderId),
          menu_id: Number(menuId),
        },
      });

      res.status(200).send("ok");
    }
  } catch (error) {
    console.log("error", error);
  }
}
