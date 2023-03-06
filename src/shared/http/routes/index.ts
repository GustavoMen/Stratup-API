import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import companiesRouter from '@modules/companies/routes/companies.routes';
import sessionsRouter from '@modules/companies/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/companies', companiesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
