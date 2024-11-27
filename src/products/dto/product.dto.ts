import { IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  productId: string;
}
