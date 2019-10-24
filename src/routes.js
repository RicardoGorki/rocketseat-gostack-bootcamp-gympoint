import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/sessions', SessionController.store);

export default routes;
