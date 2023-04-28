// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "./db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const menus = (
        await pool.query(`SELECT menus.id, menus.name AS menu_name, price, url FROM menus
        INNER JOIN menus_menu_images on menus_menu_images.menu_images_id = menus.id
        INNER JOIN menu_images on menu_images.id = menus_menu_images.menus_id`)
      ).rows;
      const menuCategories = (await pool.query("select * from menu_categories"))
        .rows;
      const addons = (await pool.query("select * from addon")).rows;
      const addonCategories = (
        await pool.query("select * from addon_categories")
      ).rows;
      const locations = (await pool.query("select * from locations")).rows;

      res.send({
        menus,
        menuCategories,
        addons,
        addonCategories,
        locations,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
