import { IHouseItem } from "../model/house.model";
import { HouseRepository } from "../repository/house.repository";

export class HouseService {
  private HouseRepository: HouseRepository;

  constructor() {
    this.HouseRepository = new HouseRepository();
  }

  async getHouses() {
    return await this.HouseRepository.getHouses();
  }

  async getHousesTrend() {
    let houses = await this.HouseRepository.getHousesTrend();

    let houseMap = new Map<string, IHouseItem>();

    houses.forEach((h) => {
      if (houseMap.has(h.house_code)) {
        houseMap
          .get(h.house_code)
          .house_price.push({ amount: h.amount, price_date: h.price_date });
      } else {
        let houseItem = {
          house_code: h.house_code,
          address: h.address,
          region_code: h.region_code,
          house_price: [{ amount: h.amount, price_date: h.price_date }],
        } as IHouseItem;

        houseMap.set(h.house_code, houseItem);
      }
    });

    let houseData = [] as IHouseItem[];
    // filling house list
    houseMap.forEach((e) => {
      houseData.push(e);
    });

    return houseData;
  }
}
