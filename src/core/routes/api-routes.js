import { Router } from 'express';
import userRoutes from '../../users/presentation/user-routes.js';
import employeeRoutes from '../../employees/presentation/employee-routes.js';
import requestRoutes from '../../requests/presentation/request-routes.js';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/employees', employeeRoutes);
apiRoutes.use('/requests', requestRoutes);

export default apiRoutes;
