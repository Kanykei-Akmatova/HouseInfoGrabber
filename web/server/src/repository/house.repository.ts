// import { connect } from "../config/db.config";
import { Pool } from "pg";
import { getPool } from "../db/db";
import {
  IHouses,
  IHouseRawData,
  IHouse,
  IHouseSearchedData,
} from "../../../common/model/house.model";

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

  async getHousesByRegionCode(regionCode: string) {
    try {
      const sql = `SELECT h.house_code, h.region_code, address, record_date, 
                            bedrooms, bathrooms, not_in_listing_date, p.amount AS price, 
                            ABS(extract(day from CURRENT_DATE::timestamp - record_date::timestamp)) AS days_since_record
                          FROM house h
                          INNER JOIN price p ON h.house_code = p.house_code
                          INNER JOIN (SELECT house_code, MAX(price_date) AS max_price_date 
                                FROM price
                                GROUP BY house_code) mp ON p.house_code = mp.house_code AND p.price_date = mp.max_price_date
                  WHERE not_in_listing_date = '1900-01-01'
                    AND region_code = $1
                  ORDER BY record_date, address `;
      const values = [regionCode];

      this.pool = getPool();
      const res = await this.pool.query(sql, values);
      await this.pool.end();

      const list = res.rows as IHouse[];
      return list;
    } catch (error) {
      console.error(error);
    }
  }

  async getHousesTrend(regionCode: string) {
    try {
      this.pool = getPool();
      const sql = `SELECT region_code, h.house_code, address, record_date, not_in_listing_date, bedrooms, bathrooms, p.amount, price_date
                    FROM house h
                    INNER JOIN (SELECT house_code, COUNT(house_code) AS house_code_count
                          FROM price
                          GROUP BY house_code) house_code_count ON h.house_code = house_code_count.house_code
                    INNER JOIN price p ON h.house_code = p.house_code
                    WHERE house_code_count.house_code_count > 1
                      AND h.not_in_listing_date = '1900-01-01'
                      AND region_code = $1
                    ORDER BY region_code, h.house_code, address, price_date ASC`;
      const values = [regionCode];

      const res = await this.pool.query(sql, values);
      await this.pool.end();

      return res.rows as IHouseRawData[];
    } catch (error) {
      console.error(error);
    }
  }

  async searchHouseByAddress(address: string) {
    try {
      this.pool = getPool();
      
      const sql = `SELECT h.house_code, address, record_date, 
                      not_in_listing_date, bedrooms, bathrooms, 
                      region_code, amount, price_date
                    FROM house h
                    INNER JOIN price p ON h.house_code = p.house_code
                    WHERE address ILIKE $1 
                    ORDER BY price_date`;
      const values = [`%${address}%`]      
      const res = await this.pool.query(sql, values);
      await this.pool.end();

      return res.rows as IHouseSearchedData[];
    } catch (error) {
      console.error(error);
    }
  }
}
