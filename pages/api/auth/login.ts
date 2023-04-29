// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const isValid = email && email.length > 0 && password && password.length > 0;
  if (!isValid) return res.send({ error: "Name and password are required." });
  const result = await pool.query(
    "select * from users where email=$1 and password=$2",
    [email, password]
  );
  if (!result.rows.length) throw new Error("Bad request. Invalid credentails.");
  //  res.cookie("token", "jfasljdkfjdasFADSFKASDFKALSksmkdf");
  res.send(result.rows);
}
