import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import companiesRouter from '@modules/companies/routes/companies.routes';
import companySessionsRouter from '@modules/companies/routes/sessions.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import customerSessionsRouter from '@modules/customers/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/companies', companiesRouter);
routes.use('/companysessions', companySessionsRouter);
routes.use('/customersessions', customerSessionsRouter);
routes.use('/customers', customersRouter);

export default routes;
