import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ExpenseController from './app/controllers/ExpenseController';

import fileMiddleware from './app/middlewares/file';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/files', FileController.index);

// Todas as requisições daqui pra baixo precisam de authenticação
routes.use(authMiddleware);

// Metodo index busca somente a lista daquele usuario.
routes.get('/expenses', ExpenseController.index);
routes.post('/expenses', ExpenseController.store);
routes.put('/expenses/:id', ExpenseController.update);
routes.delete('/expenses/:id', ExpenseController.delete);

routes.put('/users', UserController.update);

routes.post('/files', fileMiddleware, FileController.store);

export default routes;
