// import { connect } from "../config/db.config";
import { Pool } from "pg";
import { getPool } from "../db/db";
import { IRegionStat } from "../model/region.model";

export class RegionRepository {
  private pool: Pool;

  constructor() {}

  async getRegionStats() {
    try {
      this.pool = getPool();
      const query = `SELECT region_code, count(house_code) AS house_count
                    FROM house
                    WHERE not_in_listing_date = '1900-01-01'
                    GROUP BY region_code
                    ORDER BY region_code`;

      const res = await this.pool.query(query);
      await this.pool.end();

      return res.rows as IRegionStat[];
    } catch (error) {
      console.error(error);
    }
  }
}
