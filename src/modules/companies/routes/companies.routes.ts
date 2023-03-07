import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';
import CompanyIsAuthenticated from '../../../shared/http/middlewares/CompanyisAuthenticated';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.get('/', CompanyIsAuthenticated, companiesController.index);
companiesRouter.post('/', companiesController.create);

export default companiesRouter;
