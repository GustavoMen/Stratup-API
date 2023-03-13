import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersReposiroty from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  company_id: string;
}

class ListCustomersService {
  public async execute({ company_id }: IRequest): Promise<Customer[]> {
    const customersReposiroty = getCustomRepository(CustomersReposiroty);

    const customers = await customersReposiroty.findCustomersByIdCompany(
      company_id,
    );

    return customers;
  }
}

export default ListCustomersService;
