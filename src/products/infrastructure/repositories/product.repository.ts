import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/domain/entities/product.entity';
import { ProductDto } from 'src/products/dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addFavorite(product: ProductDto) {
    return await this.productRepository.save(product);
  }

  async getFavorites(userId: string): Promise<Product[]> {
    return await this.productRepository.find({ where: { userId } });
  }
}
