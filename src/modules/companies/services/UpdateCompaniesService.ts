import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Company from '../typeorm/entities/Company';
import CompaniesReposiroty from '../typeorm/repositories/CompaniesRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  company_id: string;
  password: string;
  confirmPassword: string;
  delivery_price: number;
}

class UpdateCompaniesService {
  public async execute({
    company_id,
    password,
    confirmPassword,
    delivery_price,
  }: IRequest): Promise<Company> {
    const companiesReposiroty = getCustomRepository(CompaniesReposiroty);
    const company = await companiesReposiroty.findById(company_id);

    if (!company) {
      throw new AppError('Error: Company not found.');
    }

    // Check if password is correct
    const passwordIsEqual = await compare(password, company.password);
    const confirmPasswordIsEqual = await compare(
      confirmPassword,
      company.password,
    );

    if (!passwordIsEqual) {
      throw new AppError('Incorrect email & password combination.', 401);
    }
    if (!confirmPasswordIsEqual) {
      throw new AppError('Incorrect email & password combination.', 401);
    }

    // Atualizando o objeto Company
    company.delivery_price = delivery_price;

    // Salvando na DB
    await companiesReposiroty.save(company);

    return company;
  }
}

export default UpdateCompaniesService;
