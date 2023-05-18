import type { NextApiRequest, NextApiResponse } from "next";
// import { pool } from "./db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "DELETE") {
      const id = req.query.id;
      const text = `DELETE FROM menus_order WHERE id = ($1) RETURNING *`;
      const values = [id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    }
  } catch (err) {
    console.log("error", err);
  }
}
