import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/domain/entities/product.entity';
import { ProductDto } from 'src/products/dto/product.dto';
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userRepository: UserRepository,
  ) {}

  async addFavorite(product: ProductDto, token: string) {
    const session = await this.userRepository.findSessionByToken(token);
    const newProduct = {
      ...product,
      userId: session.user.id,
    };
    return await this.productRepository.save(newProduct);
  }

  async getFavorites(token: string): Promise<Product[]> {
    const session = await this.userRepository.findSessionByToken(token);
    return await this.productRepository.find({
      where: { userId: session.user.id },
    });
  }

  async removeFavorite(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new BadRequestException('Producto no encontrado');
    }
    await this.productRepository.remove(product);
    return {
      message: 'Producto eliminado de favoritos',
    };
  }
}
