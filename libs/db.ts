import { Pool } from "pg";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const pool = new Pool({
  host: "localhost",
  port: 5437,
  user: "postgres",
  password: "thuyein7337",
  database: "happy-pos-app-db",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
