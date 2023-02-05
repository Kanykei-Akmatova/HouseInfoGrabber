// import { connect } from "../config/db.config";
import { IHouses } from "../model/house.model";
import { getPool } from "../db/db";
import { Pool } from "pg";

export class HouseRepository {
  private pool: Pool;

  constructor() {
    // // For Development
    // this.db.sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
    //this.repository = this.db.sequelize.getRepository(House);
  }

  async getHouses() {
    // try {
    //   const houses = await this.repository.findAll();
    //   console.log("houses:::", houses);
    //   return houses;
    // } catch (err) {
    //   console.log(err);
    //   return [];
    // }
    try {
      this.pool = getPool();
      const res = await this.pool.query("SELECT * FROM house");
      await this.pool.end();

      // res.rows.map((r) => (
      //   console.log(r.house_code)
      // ));

      const list = res.rows as IHouses;

      console.log(list);

      return list;
    } catch (error) {
      console.error(error);
    }
  }

  async createHouse(house) {
    let data = {};
    // try {
    //   house.createdate = new Date().toISOString();
    //   data = await this.repository.create(house);
    // } catch (err) {
    //   console.error("Error::" + err);
    // }
    return data;
  }

  async updateHouse(house) {
    let data = {};
    // try {
    //   house.updateddate = new Date().toISOString();
    //   data = await this.repository.update(
    //     { ...house },
    //     {
    //       where: {
    //         id: house.id,
    //       },
    //     }
    //   );
    // } catch (err) {
    //   console.error("Error::" + err);
    // }
    return data;
  }

  async deleteHouse(houseId) {
    let data = {};
    // try {
    //   data = await this.repository.destroy({
    //     where: {
    //       id: houseId,
    //     },
    //   });
    // } catch (err) {
    //   console.error("Error::" + err);
    // }
    return data;
  }
}
