import * as express from 'express';
import UserController from '../controllers/users.controller';
const userRoutes = express.Router();
const controller = new UserController();

userRoutes.get('/fetch', controller.getAllPosts);
userRoutes.post('/create', controller.createAPost);

export default userRoutes;