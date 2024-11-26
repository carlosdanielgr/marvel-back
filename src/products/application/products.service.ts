import { Injectable } from '@nestjs/common';

import { Product } from 'src/products/domain/entities/product.entity';
import { ProductUseCase } from './use-case/product.use-case';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productUseCase: ProductUseCase) {}

  async addFavorite(product: ProductDto) {
    return await this.productUseCase.addFavorite(product);
  }

  async getFavorites(userId: string) {
    return await this.productUseCase.getFavorites(userId);
  }
}
