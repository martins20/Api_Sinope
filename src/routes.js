import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import fileMiddleware from './app/middlewares/file';


import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//Rotas de Usuarios
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

//Rotas de Sessão
routes.post('/sessions', SessionController.store)

// Todas as requisições daqui pra baixo precisam de authenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

//Files
routes.post('/files', authMiddleware, fileMiddleware, (req, res) => {
  return res.json({ ok: true });
});

export default routes;
