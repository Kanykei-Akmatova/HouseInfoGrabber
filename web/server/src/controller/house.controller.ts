import { Router, Request, Response } from 'express';
import { HouseService } from '../service/house.service';

export class HouseController {
	public router: Router;
    public houseService: HouseService;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.houseService = new HouseService();
        this.init();
    }
      
	getHouses = async (request: Request, response: Response) => {
        const houses = await this.houseService.getHouses();
		response.send(houses);
	}

    getHousesByRegionCode = async (request: Request, response: Response) => {
        const houses = await this.houseService.getHousesByRegionCode(request.params.code);
		response.send(houses);
	}

    getHousesTrend = async (request: Request, response: Response) => {
        const housesTrend = await this.houseService.getHousesTrend(request.params.code);
		response.send(housesTrend);
	}

    searchHouseByAddress = async (request: Request, response: Response) => {
        const houses = await this.houseService.searchHouseByAddress(request.params.address);
		response.send(houses);
	}

	private init() {
        this.router.get('/fetch', this.getHouses);
        this.router.get('/trend/:code', this.getHousesTrend);
        this.router.get('/list/:code', this.getHousesByRegionCode);
        this.router.get('/search/:address', this.searchHouseByAddress);
    }
}

export default new HouseController().router;