import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import {
  pagesDtos,
  productCreateRequest,
  productsDtos,
  productsUpdateDtos,
  variantResponse,
} from '../model/products.model';
import { variant } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  // create product
  create(form: FormData): Observable<ApiResponse<productCreateRequest>> {
    return this.http.post<ApiResponse<productCreateRequest>>(
      `${environment.api}/Product/create-products`,
      form
    );
  }
  getData(page: number): Observable<ApiResponse<productsDtos[]>> {
    return this.http.get<ApiResponse<productsDtos[]>>(
      `${environment.api}/Product/page-${page}`
    );
  }
  getOnlyProduct(id: number): Observable<ApiResponse<productsUpdateDtos>> {
    return this.http.get<ApiResponse<productsUpdateDtos>>(
      `${environment.api}/Product/single-product-${id}`
    );
  }

  update(
    form: FormData,
    id: number
  ): Observable<ApiResponse<productsUpdateDtos>> {
    return this.http.put<ApiResponse<productsUpdateDtos>>(
      `${environment.api}/Product/update-product-${id}`,
      form
    );
  }
  countLength(name: FormData): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(
      `${environment.api}/Product/get-number`,
      name
    );
  }

  // search product by name
  SearchProductsByName(
    request: pagesDtos
  ): Observable<ApiResponse<productsDtos[]>> {
    return this.http.post<ApiResponse<productsDtos[]>>(
      `${environment.api}/Product/search-product`,
      request
    );
  }
}
