import CreateCompaniesService from '@modules/companies/services/CreateCompaniesService';
import { Request, Response } from 'express';
import ListCompaniesService from '../services/ListCompaniesService';

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
}
