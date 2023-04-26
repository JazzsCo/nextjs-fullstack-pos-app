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
        await pool.query(`SELECT menus.id, name, price, url, is_avilable AS avilable FROM menus
        INNER JOIN menus_menu_images on menus_menu_images.menu_images_id = menus.id
        INNER JOIN menu_images on menu_images.id = menus_menu_images.menus_id`)
      ).rows;
      const menuCategories = (await pool.query("select * from menu_categories"))
        .rows;
      const addons = (await pool.query("select * from addon")).rows;
      const addonCategories = (
        await pool.query("select * from addon_categories")
      ).rows;
      res.send({
        menus,
        menuCategories,
        addons,
        addonCategories,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
