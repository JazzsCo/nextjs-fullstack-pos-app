// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../db/db";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) return res.send({ error: "Name and password are required." });

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query("select * from users where email=$1", [
    email,
  ]);

  if (result.rows.length) res.send({ message: "User already exists." });

  const newUser = await pool.query(
    "insert into users (name, email, password) values($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  res.send(newUser);
}
