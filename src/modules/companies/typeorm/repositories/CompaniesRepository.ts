import { EntityRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

@EntityRepository(Company)
class CompaniesReposiroty extends Repository<Company> {
  public async findByName(name: string): Promise<Company | undefined> {
    const company = await this.findOne({
      where: { name },
    });

    return company;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const company = await this.findOne({
      where: { id },
    });

    return company;
  }

  public async findByEmail(email: string): Promise<Company | undefined> {
    const company = await this.findOne({
      where: { email },
    });

    return company;
  }
}

export default CompaniesReposiroty;
