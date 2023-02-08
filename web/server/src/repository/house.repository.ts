// import { connect } from "../config/db.config";
import { Pool } from "pg";
import { getPool } from "../db/db";
import { IHouses, IHouseRawData } from "../model/house.model";

export class HouseRepository {
  private pool: Pool;

  constructor() {}

  async getHouses() {
    try {
      this.pool = getPool();
      const res = await this.pool.query("SELECT * FROM house");
      await this.pool.end();

      const list = res.rows as IHouses;
      return list;
    } catch (error) {
      console.error(error);
    }
  }

  async getHousesTrend() {
    try {
      this.pool = getPool();
      const query = `SELECT region_code, h.house_code, address, p.amount, price_date
                    FROM house h
                    INNER JOIN (SELECT house_code, COUNT(house_code) AS house_code_count
                          FROM price
                          GROUP BY house_code) house_code_count ON h.house_code = house_code_count.house_code
                    INNER JOIN price p ON h.house_code = p.house_code
                    WHERE house_code_count.house_code_count > 1
                      AND h.not_in_listing_date = '1900-01-01'
                    ORDER BY region_code, h.house_code, address, price_date DESC`;

      const res = await this.pool.query(query);
      await this.pool.end();
      
      return res.rows as IHouseRawData[];
    } catch (error) {
      console.error(error);
    }
  }
}
