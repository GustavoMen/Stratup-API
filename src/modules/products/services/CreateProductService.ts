import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
}

class CreateProductService {
  public async execute({ name, price }: IRequest): Promise<Product> {
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
