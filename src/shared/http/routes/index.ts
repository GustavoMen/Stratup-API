import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import companiesRouter from '@modules/companies/routes/companies.routes';
import sessionsRouter from '@modules/companies/routes/sessions.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/companies', companiesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/customers', customersRouter);

export default routes;
