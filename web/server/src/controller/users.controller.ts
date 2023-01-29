import { Router, Request, Response } from 'express';
import UserModel from '../models/user';

export class UserController {

	public router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.init();
    }

	user = new UserModel();  // Object of User model
	private posts = [
		{
			name: 'Marcin',
			content: 'Dolor sit amet',
			title: 'Lorem Ipsum',
		}
	];
      // Business Logic for GET API
	getAllPosts = (request: Request, response: Response) => {
		response.send(this.posts);
	}

     // Business Logic for POST API
	createAPost = (request, response) => {
           // Moongo DB Insert Operation
		this.user.saveUser(this.posts, (err, user) => {
			if (err) {
				response.send(err)
			} else {
				response.send(user);
			}
		})
	}
	private init() {
        this.router.get('/fetch', this.getAllPosts);
		this.router.post('/create', this.createAPost);
    }
}

export default new UserController().router;