import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';
import isAuthenticated from '../middlewares/isAuthenticated';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.get('/', isAuthenticated, companiesController.index);
companiesRouter.post('/', companiesController.create);

export default companiesRouter;
