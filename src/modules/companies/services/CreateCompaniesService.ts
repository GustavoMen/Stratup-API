import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Company from '../typeorm/entities/Company';
import CompaniesReposiroty from '../typeorm/repositories/CompaniesRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateCompaniesService {
  public async execute({ name, email, password }: IRequest): Promise<Company> {
    const companiesReposiroty = getCustomRepository(CompaniesReposiroty);
    const emailExists = await companiesReposiroty.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    // Montando o objeto Company
    const company = companiesReposiroty.create({
      name,
      email,
      password: hashedPassword,
    });

    // Salvando na DB
    await companiesReposiroty.save(company);

    return company;
  }
}

export default CreateCompaniesService;
