import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import fileMiddleware from './app/middlewares/file';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/files', FileController.index);

// Todas as requisições daqui pra baixo precisam de authenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', fileMiddleware, FileController.store);

export default routes;
