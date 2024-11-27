import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { ProductUseCase } from './use-case/product.use-case';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  private readonly baseUrl = 'https://gateway.marvel.com/v1/public';
  private readonly apiKey = '324a70fb53d493c8c94e08634f13b193';
  private readonly ts = '1';
  private readonly hash = 'ff047ececf0f481900678f1230a58ab1';

  constructor(
    private readonly productUseCase: ProductUseCase,
    private readonly httpService: HttpService,
  ) {}

  async getComics(): Promise<any> {
    const url = `${this.baseUrl}/comics`;
    const params = {
      apikey: this.apiKey,
      ts: this.ts,
      hash: this.hash,
    };

    const response = this.httpService.get(url, { params });
    return await lastValueFrom(response).then((res) => res.data);
  }

  async addFavorite(product: ProductDto, token: string) {
    return await this.productUseCase.addFavorite(product, token);
  }

  async getFavorites(token: string) {
    return await this.productUseCase.getFavorites(token);
  }

  async removeFavorite(id: string) {
    return await this.productUseCase.removeFavorite(id);
  }
}
