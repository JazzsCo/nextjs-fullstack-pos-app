import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/db";
import { menus_locations } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const imageUrl = req.body.imageUrl;
      const { name, price, locationIds } = req.body.menu;

      const newMenu = await prisma.menus.create({
        data: {
          name,
          price,
          image_url: imageUrl,
        },
      });

      const menusLocations = locationIds.map((locId: number) => {
        return {
          location_id: locId,
          menu_id: newMenu.id,
        };
      });

      const newMenusLocations = await prisma.$transaction(
        menusLocations.map((item: any) =>
          prisma.menus_locations.create({
            data: item,
          })
        )
      );

      res.status(200).send({ newMenu, newMenusLocations });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { locationId } = req.body;
      const { name, price } = req.body.updateMenu;

      const menuUpdate = await prisma.menus.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          price,
        },
      });

      const validLocationId = (
        await prisma.menus_locations.findMany({
          where: { menu_id: Number(id) },
        })
      )
        .map((item: menus_locations) => item.location_id)
        .map((item: any) => item) as number[];

      const differentLocationIdUpdate = locationId.filter(
        (id: number) => !validLocationId.includes(id)
      );

      const differentLocationIdDelete = validLocationId.filter(
        (id: number) => !locationId.includes(id)
      );

      if (differentLocationIdUpdate.length > 0) {
        const menuLocationUpdate = differentLocationIdUpdate.map(
          (locId: number) => {
            return { menu_id: Number(id), location_id: locId };
          }
        );

        await prisma.menus_locations.createMany({
          data: menuLocationUpdate,
        });
      }

      if (differentLocationIdDelete.length > 0)
        await prisma.menus_locations.deleteMany({
          where: {
            menu_id: Number(id),
            location_id: {
              in: differentLocationIdDelete,
            },
          },
        });

      const menusLocations = await prisma.menus_locations.findMany();

      res.status(200).send({ menuUpdate, menusLocations });
    } else if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.send(400);

      const deleteMenu = await prisma.menus.update({
        data: { is_archived: true },
        where: { id: Number(id) },
      });

      return res.status(200).send({ deleteMenu });
    }
  } catch (err) {
    console.log("error", err);
  }
}
