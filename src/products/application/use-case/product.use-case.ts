import { Injectable } from '@nestjs/common';

import { ProductDto } from 'src/products/dto/product.dto';
import { ProductRepository } from 'src/products/infrastructure/repositories/product.repository';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async addFavorite(product: ProductDto, token: string) {
    return await this.productRepository.addFavorite(product, token);
  }

  async getFavorites(token: string) {
    return await this.productRepository.getFavorites(token);
  }

  async removeFavorite(id: string) {
    return await this.productRepository.removeFavorite(id);
  }
}
