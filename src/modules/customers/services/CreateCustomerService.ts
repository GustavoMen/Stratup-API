import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import CustomersReposiroty from '../typeorm/repositories/CustomersRepository';
import CompaniesReposiroty from '@modules/companies/typeorm/repositories/CompaniesRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  company_id: string;
}

class CreateCustomerService {
  public async execute({
    name,
    email,
    password,
    company_id,
  }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersReposiroty);
    const companiesRepositories = getCustomRepository(CompaniesReposiroty);
    const companyExists = await companiesRepositories.findById(company_id);
    const emailExistsInCompany =
      await customersRepository.findEmailCustomerInCompany(company_id, email);

    if (!companyExists) {
      throw new AppError('Error: Company not found');
    }
    if (emailExistsInCompany) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    // Montando o objeto Company
    const customer = customersRepository.create({
      name,
      email,
      password: hashedPassword,
      company: companyExists,
    });

    // Salvando na DB
    await customersRepository.save(customer);

    return;
  }
}

export default CreateCustomerService;
