import Company from '../typeorm/entities/Company';
import CompaniesReposiroty from '../typeorm/repositories/CompaniesRepository';

import { getCustomRepository } from 'typeorm';

class ListCompaniesService {
  public async execute(): Promise<Company[]> {
    const companiesRepository = getCustomRepository(CompaniesReposiroty);

    const companies = await companiesRepository.find();

    return companies;
  }
}

export default ListCompaniesService;
