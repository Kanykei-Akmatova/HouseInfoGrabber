import { Router, Request, Response } from 'express';
import { RegionService } from '../service/region.service';

export class RegionController {
	public router: Router;
    public regionService: RegionService;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.regionService = new RegionService();
        this.init();
    }
      
	getRegionStats = async (request: Request, response: Response) => {
        const houses = await this.regionService.getRegionStats();
		response.send(houses);
	}

    getRegionInventory = async (request: Request, response: Response) => {
        const houses = await this.regionService.getRegionInventory(request.params.code);
		response.send(houses);
	}

	private init() {
        this.router.get('/report', this.getRegionStats);
        this.router.get('/inventory/:code', this.getRegionInventory);
    }
}

export default new RegionController().router;