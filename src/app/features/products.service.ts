import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from './product.model';
import { APP_CONFIG } from '../app.config'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http = inject(HttpClient);
  config = inject(APP_CONFIG);
  constructor() { }
  getProducts(){
    return this.http.get<ProductResponse>(`${this.config.apiPrefix}/products`);
  }
}
