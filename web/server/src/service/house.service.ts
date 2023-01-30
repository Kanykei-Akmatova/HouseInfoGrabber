import { HouseRepository } from '../repository/house.repository';

export class HouseService {

    private HouseRepository: HouseRepository;

    constructor() {
        this.HouseRepository = new HouseRepository();
    }

    async getHouses() {
        return await this.HouseRepository.getHouses();
    }

    async createHouse(House) {
        return await this.HouseRepository.createHouse(House);
    }

    async updateHouse(House) {
        return await this.HouseRepository.updateHouse(House);
    }

    async deleteHouse(HouseId) {
        return await this.HouseRepository.deleteHouse(HouseId);
    }

}