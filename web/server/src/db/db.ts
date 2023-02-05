import { Pool } from "pg";
import { config } from "dotenv";

// export class DB {
//   public pool: Pool;

//   constructor() {
//     const conf = config();
//     console.log(conf)

//     const hostName = process.env.DB_HOST;
//     const userName = process.env.DB_USER;
//     const password = process.env.DB_PASSWORD;
//     const database = process.env.DB_NAME;
//     const dialect: any = process.env.DIALECT;

//     this.pool = new Pool({
//       user: userName,
//       database: database,
//       password: password,
//       port: 5432,
//       host: hostName,
//     });
//   }
// }

// export default new DB().pool;

export const getPool = () => {
  const conf = config();
  console.log(conf);

  const hostName = process.env.DB_HOST;
  const userName = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const dialect: any = process.env.DIALECT;

  const pool = new Pool({
    user: userName,
    database: database,
    password: password,
    port: 5432,
    host: hostName,
  });

  return pool;
};
