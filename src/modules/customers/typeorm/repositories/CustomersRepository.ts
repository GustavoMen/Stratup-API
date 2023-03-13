import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersReposiroty extends Repository<Customer> {
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { id },
      relations: ['company'],
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { email },
    });

    return customer;
  }

  public async findCustomersByIdCompany(id: string): Promise<Customer[]> {
    const customer = await this.find({
      where: { company: id },
    });

    return customer;
  }
}

export default CustomersReposiroty;
