import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, price } = req.body.menu;
      const text = `INSERT INTO menus_order(name, price) VALUES($1, $2) RETURNING *`;
      const values = [name, price];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } else if (req.method === "PUT") {
      const { name, price } = req.body.menu;
      const id = req.query.id;
      const text = ` UPDATE menus SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
      const values = [name, price, id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } else if (req.method === "GET") {
      const id = req.query.id;
      const text = `SELECT menus.name AS menu_name, price, is_available AS available, locations.name AS location_name FROM menus
        INNER JOIN location_menus ON location_menus.menu_id = menus.id
        INNER JOIN locations ON locations.id = location_menus.location_id
        WHERE locations.id = $1`;
      const values = [id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    }
  } catch (err) {
    console.log("error", err);
  }
}
