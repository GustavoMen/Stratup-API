import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CompaniesController from '../controllers/CompaniesController';
import CompanyIsAuthenticated from '../../../shared/http/middlewares/CompanyisAuthenticated';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.get('/', CompanyIsAuthenticated, companiesController.index);

companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  companiesController.create,
);

companiesRouter.put(
  '/',
  CompanyIsAuthenticated,
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      delivery_price: Joi.number().precision(2).required(),
    },
  }),
  companiesController.update,
);

export default companiesRouter;
