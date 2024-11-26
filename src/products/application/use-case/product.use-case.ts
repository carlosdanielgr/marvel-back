import { Injectable } from '@nestjs/common';

import { ProductDto } from 'src/products/dto/product.dto';
import { ProductRepository } from 'src/products/infrastructure/repositories/product.repository';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async addFavorite(product: ProductDto) {
    return await this.productRepository.addFavorite(product);
  }

  async getFavorites(userId: string) {
    return await this.productRepository.getFavorites(userId);
  }
}
