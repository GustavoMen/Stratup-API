import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
}

class UpdateProductService {
  public async execute({ id, name, price }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    const productExists = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
