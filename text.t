
import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "passport_booking_app",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
app.get("/availability", async (req: Request, res: Response) => {
  const text = `INSERT INTO bookings(booking_date, time, user_id) VALUES($1, $2, $3) RETURNING *`;
  const values = ["2023-06-09", 11, 2];
  const { rows } = await pool.query(text, values);
  res.send(rows);
});
const { rows } = await pool.query("SELECT * FROM bookings");
  res.send(rows);