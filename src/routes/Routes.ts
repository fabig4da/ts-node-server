import express from 'express';
import autRoutes from './auth/authRoutes';
import userRoutes from './users/user';


const routes = express();

routes.use(userRoutes);
routes.use(autRoutes);

export default routes;