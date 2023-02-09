import { Router, Request, Response } from 'express';

export class HealthController {

	public router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.init();
    }
    
	getStatus = (request: Request, response: Response) => {
        const res = {
            status: "ok"
        };
        response.send(res);
	}

	private init() {
        this.router.get('/status', this.getStatus);
    }
}

export default new HealthController().router;