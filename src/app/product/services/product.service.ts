import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeProducts } from '../models/home-products.model';
import { PRODUCTS_API } from '@core/constants/api.constant';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  // Should be api core
  fetchHomeProduct(): Observable<HomeProducts> {
    return this.http.get<HomeProducts>(PRODUCTS_API + 'home');
  }

  fetchProduct(idName: string): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_API + idName);
  }
}
