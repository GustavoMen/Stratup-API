import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import Company from '../typeorm/entities/Company';
import CompaniesReposiroty from '../typeorm/repositories/CompaniesRepository';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: Company;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const companiesReposiroty = getCustomRepository(CompaniesReposiroty);
    const company = await companiesReposiroty.findByEmail(email);

    // Check if company exists
    if (!company) {
      throw new AppError('Incorrect email & password combination.', 401);
    }

    const passwordConfirmed = await compare(password, company.password);

    // Check if password is correct
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email & password combination.', 401);
    }

    const token = sign({}, authConfig.Companiesjwt.secret, {
      subject: company.id,
      expiresIn: authConfig.Companiesjwt.expiresIn,
    });

    return {
      company,
      token,
    };
  }
}

export default CreateSessionsService;
