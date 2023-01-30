import * as express from 'express';
import * as _ from 'lodash';
import HouseController from './controller/house.controller';
import UserController from './controller/users.controller';

// Creates and configures an ExpressJS web server.
export class App {
    // ref to Express instance
    public app: express.Application;

    // run configuration methods on the Express instance.
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();        
    }  

    // configure Express middleware.
    private middleware() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
   
    // configure API endpoints.
    private routes(): void {
        this.app.use('/api/user', UserController);
        this.app.use('/api/house', HouseController);
        this.app.use('*', express.static('public'));
    }
}

export default new App().app;