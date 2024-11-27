import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { AuthModule } from 'src/auth/auth.module';
import { Product } from './domain/entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { ProductUseCase } from './application/use-case/product.use-case';
import { ProductService } from './application/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule, HttpModule],
  controllers: [ProductController],
  providers: [ProductRepository, ProductUseCase, ProductService],
})
export class ProductModule {}
