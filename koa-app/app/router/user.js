import UserController from '../controller/User'
import Router from 'koa-router'

const User = new Router();

User.get('/login', UserController.login);
User.get('/signOut', UserController.signOut);
User.get('/register', UserController.register);

export default User
