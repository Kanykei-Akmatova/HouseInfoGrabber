import { connect } from "../config/db.config";
import { House } from "../model/house.model";

export class HouseRepository {
  private db: any = {};
  private repository: any;

  constructor() {
    this.db = connect();
    // // For Development
    // this.db.sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
    this.repository = this.db.sequelize.getRepository(House);
  }

  async getHouses() {
    try {
      const houses = await this.repository.findAll();
      console.log("houses:::", houses);
      return houses;
    } catch (err) {
      console.log(err);
      return [];
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