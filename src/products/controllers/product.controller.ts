import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { ProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Post('add-favorite')
  addFavorite(
    @Body()
    body: ProductDto,
  ) {
    return 'Product added to favorites';
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  getFavorites() {
    return 'List of favorite products';
  }
}
