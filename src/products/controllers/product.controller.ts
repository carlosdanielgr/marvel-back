import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Delete,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { ProductDto } from '../dto/product.dto';
import { ProductService } from '../application/products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-favorite')
  addFavorite(
    @Body()
    body: ProductDto,
    @Req() req: Request,
  ) {
    const token = req.headers['authorization'];
    return this.productService.addFavorite(body, token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  getFavorites(@Req() req: Request) {
    const token = req.headers['authorization'];
    return this.productService.getFavorites(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('comics')
  getCommits() {
    return this.productService.getComics();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-favorite/:id')
  removeFavorite(@Param('id') id: string) {
    return this.productService.removeFavorite(id);
  }
}
