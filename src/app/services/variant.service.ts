import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse } from '../model/ApiResponse.model';
import { variant, variantResponse } from '../model/category.model';
import { productsUpdateDtos } from '../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  constructor(private http: HttpClient) {}
  // cc
  getVariantByIdProduct(
    id: number
  ): Observable<ApiResponse<variantResponse[]>> {
    return this.http.get<ApiResponse<variantResponse[]>>(
      `${environment.api}/Variant/get-variant-${id}`
    );
  }
  createVariant(request: variant): Observable<ApiResponse<variantResponse>> {
    return this.http.post<ApiResponse<variantResponse>>(
      `${environment.api}/Variant/create-variant`,
      request
    );
  }
  updateVariant(
    request: variantResponse
  ): Observable<ApiResponse<productsUpdateDtos>> {
    return this.http.put<ApiResponse<productsUpdateDtos>>(
      `${environment.api}/Variant/update-variant`,
      request
    );
  }
  updateStatusVariant(id: number): Observable<ApiResponse<variantResponse>> {
    return this.http.patch<ApiResponse<variantResponse>>(
      `${environment.api}/Variant/update-status-${id}`,
      id
    );
  }
  DeleteVariant(id: number): Observable<ApiResponse<variantResponse>> {
    return this.http.delete<ApiResponse<variantResponse>>(
      `${environment.api}/Variant/delete-variant-${id}`
    );
  }
}
