import CompanyIsAuthenticated from '@shared/http/middlewares/CompanyisAuthenticated';
import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const companiesController = new CustomersController();

customersRouter.get('/', CompanyIsAuthenticated, companiesController.index);
customersRouter.post('/', companiesController.create);

export default customersRouter;
