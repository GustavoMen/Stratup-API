import { Request, Response } from 'express';

import CreateCompaniesService from '@modules/companies/services/CreateCompaniesService';
import ListCompaniesService from '../services/ListCompaniesService';
import UpdateCompaniesService from '../services/UpdateCompaniesService';

export default class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCompanies = new ListCompaniesService();

    const companies = await listCompanies.execute();

    return response.json(companies);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createCompany = new CreateCompaniesService();

    const company = await createCompany.execute({
      name,
      email,
      password,
    });

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { password, confirmPassword, delivery_price } = request.body;
    const { id } = request.company;

    const updateCompany = new UpdateCompaniesService();

    const company = await updateCompany.execute({
      company_id: id,
      password,
      confirmPassword,
      delivery_price,
    });

    return response.json(company);
  }
}
