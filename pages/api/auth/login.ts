// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { pool } from "@/libs/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  // input, request, data validation
  const isValid = email && email.length > 0 && password && password.length > 0;
  // if (!isValid) return res.send({ error: "Name and password are required." });
  // const result = await pool.query(
  //   "select * from users where email=$1 and password=$2",
  //   [email, password]
  // );

  if (!isValid) return res.status(400);

  const result = await pool.query("select * from users where email=$1", [
    email,
  ]);

  if (!result.rows.length) return res.status(404);

  const isValidPassword = await bcrypt.compare(
    password,
    result.rows[0].password
  );

  // if (!result.rows.length) throw new Error("Bad request. Invalid credentails.");
  // //  res.cookie("token", "jfasljdkfjdasFADSFKASDFKALSksmkdf");
  // res.send(result.rows);

  if (!isValidPassword) return res.status(401).send("Invalid credentails.");
  res.send({ user: result.rows[0] });
}
