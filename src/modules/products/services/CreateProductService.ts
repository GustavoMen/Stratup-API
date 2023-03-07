import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import CompaniesReposiroty from '@modules/companies/typeorm/repositories/CompaniesRepository';

interface IRequest {
  name: string;
  price: number;
  company_id: string;
}

class CreateProductService {
  public async execute({
    name,
    price,
    company_id,
  }: IRequest): Promise<Product> {
    const companiesRepository = getCustomRepository(CompaniesReposiroty);
    const companyExists = await companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('There is no company for own this product');
    }

    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // Montando o objeto de produto
    const product = productsRepository.create({
      name,
      price,
    });

    //Salvando o produto na DB
    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
