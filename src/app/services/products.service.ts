import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import {
  productCreateRequest,
  productsDtos,
  productsUpdateDtos,
} from '../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // create product
  create(form: FormData): Observable<ApiResponse<productCreateRequest>> {
    return this.http.post<ApiResponse<productCreateRequest>>(
      `${environment.api}/Product/create-products`,
      form
    );
  }
  getData(): Observable<ApiResponse<productsDtos[]>> {
    return this.http.get<ApiResponse<productsDtos[]>>(
      `${environment.api}/Product`
    );
  }
  getOnlyProduct(id: number): Observable<ApiResponse<productsUpdateDtos>> {
    return this.http.get<ApiResponse<productsUpdateDtos>>(
      `${environment.api}/Product/single-product-${id}`
    );
  }
}
