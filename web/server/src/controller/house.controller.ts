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

    getHousesTrend = async (request: Request, response: Response) => {
        const housesTrend = await this.houseService.getHousesTrend();
		response.send(housesTrend);
	}

	private init() {
        this.router.get('/fetch', this.getHouses);
        this.router.get('/trend', this.getHousesTrend);
    }
}

export default new HouseController().router;