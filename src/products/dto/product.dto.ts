import { IsString, IsUUID } from 'class-validator';

export class ProductDto {
  @IsUUID()
  userId: string;

  @IsString()
  productId: string;
}
