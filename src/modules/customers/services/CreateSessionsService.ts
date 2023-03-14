import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import Customer from '../typeorm/entities/Customer';
import CustomersReposiroty from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  customer: Customer;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const customersReposiroty = getCustomRepository(CustomersReposiroty);
    const customer = await customersReposiroty.findByEmail(email);

    // Check if company exists
    if (!customer) {
      throw new AppError('Incorrect email & password combination.', 401);
    }

    const passwordConfirmed = await compare(password, customer.password);

    // Check if password is correct
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email & password combination.', 401);
    }

    const token = sign({}, authConfig.Customersjwt.secret, {
      subject: customer.id,
      expiresIn: authConfig.Customersjwt.expiresIn,
    });

    return {
      customer,
      token,
    };
  }
}

export default CreateSessionsService;
