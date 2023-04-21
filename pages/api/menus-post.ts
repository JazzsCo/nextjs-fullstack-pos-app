import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, prize } = req.body.menu;
      const text = `INSERT INTO menus(name, prize) VALUES($1, $2) RETURNING *`;
      const values = [name, prize];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    }
  } catch (err) {
    console.log("error", err);
  }
}
