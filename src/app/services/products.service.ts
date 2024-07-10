import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import {
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
  constructor(private http: HttpClient) {}

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

  updateVariant(
    request: variantResponse
  ): Observable<ApiResponse<productsUpdateDtos>> {
    return this.http.put<ApiResponse<productsUpdateDtos>>(
      `${environment.api}/Product/update-variant`,
      request
    );
  }

  getVariantByIdProduct(
    id: number
  ): Observable<ApiResponse<variantResponse[]>> {
    return this.http.get<ApiResponse<variantResponse[]>>(
      `${environment.api}/Product/get-variant-${id}`
    );
  }

  // create variant by id prodcut
  createVariant(request: variant): Observable<ApiResponse<variantResponse>> {
    return this.http.post<ApiResponse<variantResponse>>(
      `${environment.api}/Product/create-variant`,
      request
    );
  }

  // update status variant by id
  updateStatusVariant(id: number): Observable<ApiResponse<variantResponse>> {
    return this.http.put<ApiResponse<variantResponse>>(
      `${environment.api}/Product/update-status-${id}`,
      id
    );
  }

  // Delete variant by id
  DeleteVariant(id: number): Observable<ApiResponse<variantResponse>> {
    return this.http.delete<ApiResponse<variantResponse>>(
      `${environment.api}/Product/delete-variant-${id}`
    );
  }

  countLength(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(
      `${environment.api}/Product/get-count`
    );
  }
}
