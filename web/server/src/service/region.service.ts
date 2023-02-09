import { IRegionStat } from "../../../common/model/region.model";
import { RegionRepository } from "../repository/region.repository";

export class RegionService {
  private regionRepository: RegionRepository;

  constructor() {
    this.regionRepository = new RegionRepository();
  }

  async getRegionStats() {
    return await this.regionRepository.getRegionStats() as IRegionStat[];
  }
}
