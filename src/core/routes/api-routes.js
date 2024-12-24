import { Router } from 'express';
import userRoutes from '../../users/interfaces/user-routes.js';
import employeeRoutes from '../../employees/interfaces/employee-routes.js';
import requestRoutes from '../../requests/interfaces/request-routes.js';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/employees', employeeRoutes);
apiRoutes.use('/requests', requestRoutes);

export default apiRoutes;
