import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/db";
import { getQrCodeUrl, qrCodeImageUpload } from "@/libs/fileUpload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, locationId } = req.body.newTable;

    const isValid = name && locationId;
    if (!isValid) return res.send(400);

    const table = await prisma.tables.create({
      data: { name, locations_id: Number(locationId) },
    });

    await qrCodeImageUpload(locationId, table.id);
    const qrCodeUrl = getQrCodeUrl(Number(locationId), table.id);

    const setTable = await prisma.tables.update({
      data: { table_url: qrCodeUrl },
      where: { id: table.id },
    });

    return res.status(200).send({ setTable });
  } else if (req.method === "PUT") {
    const { id } = req.query;

    const { updateTableName } = req.body;

    const isValid = id && updateTableName;
    if (!isValid) return res.send(400);

    await prisma.tables.update({
      data: { name: updateTableName },
      where: { id: Number(id) },
    });

    return res.status(200).json({ ok: "There will be ok" });
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) return res.send(400);

    const deleteTable = await prisma.tables.update({
      data: { is_archived: true },
      where: { id: Number(id) },
    });

    return res.status(200).send({ deleteTable });
  }
  res.send(405);
}
