// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "fish_user",
//   database: "fish",
//   password: "password",
//   port: 5432,
//   host: "localhost",
// });

// module.exports = { pool };

import { Client, Pool } from "pg";

export class DB {
  public pool: Pool;

  constructor() {
    const hostName = process.env.HOST;
    const userName = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const dialect: any = process.env.DIALECT;

    this.pool = new Pool({
      user: userName,
      database: database,
      password: password,
      port: 5432,
      host: hostName,
    });
  }
}

export default new DB().pool;
