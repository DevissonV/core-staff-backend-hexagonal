import { Router } from 'express';
import UserController from './user-controller.js';
import { authenticate, authorize } from '../../core/middlewares/auth-middleware.js';

const userRoutes = Router();


userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login); 
userRoutes.delete('/:id', authenticate, authorize(['admin']), UserController.delete); 

export default userRoutes;
