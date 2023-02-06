import { Pool } from "pg";
import { config } from "dotenv";

export const getPool = () => {
  const conf = config();

  const hostName = process.env.DB_HOST;
  const userName = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  const pool = new Pool({
    user: userName,
    database: database,
    password: password,
    port: 5432,
    host: hostName,
  });

  return pool;
};
