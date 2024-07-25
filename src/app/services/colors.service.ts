import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { colorDtos } from '../model/products.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(private http: HttpClient) {}

  create(request: colorDtos): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${environment.api}/Colors/create-color  `,
      request
    );
  }

  Delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${environment.api}/Colors/delete-color-${id}`
    );
  }
}
