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

	private posts = [
		{
			name: 'Marcin',
			content: 'Dolor sit amet',
			title: 'Lorem Ipsum',
		}
	];
      
	getHouses = async (request: Request, response: Response) => {
        const houses = await this.houseService.getHouses();
		response.send(houses);
	}

	private init() {
        this.router.get('/fetch', this.getHouses);
    }
}

export default new HouseController().router;