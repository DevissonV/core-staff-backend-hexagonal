import express from 'express';
import { envs } from './config/envs.js';
import { applyMiddlewares } from './config/middlewares.js';
import apiRoutes from '../interfaces/routes/api-routes.js';

const app = express();

applyMiddlewares(app);

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(envs.APP_PORT, () => {
  console.log(`Server running on port ${envs.APP_PORT}`);
});

export default app;