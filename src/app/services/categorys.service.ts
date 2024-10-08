import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { categoryDtos, createcategoryDtos } from '../model/category.model';
import { ApiResponse } from '../model/ApiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  constructor(private http: HttpClient) {}

  getData(): Observable<ApiResponse<categoryDtos[]>> {
    return this.http.get<ApiResponse<categoryDtos[]>>(
      `${environment.api}/Category/get-all`
    );
  }

  postCate(data: FormData): Observable<createcategoryDtos> {
    return this.http.post<createcategoryDtos>(`${environment.api}/Category/Post-cate`, data);
  }
  putCate(id: number, data: FormData): Observable<createcategoryDtos> {
    return this.http.put<createcategoryDtos>(
      `${environment.api}/Category/Put-Cate-` + id,
      data
    );
  }
  getcateid(id: number): Observable<any> {
    return this.http.get<categoryDtos>(
      `${environment.api}/Category/Get-cate-` + id
    );
  }
  deletecate(id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.api}/Category/Delete-Cate-` + id
    );
  }
  catehaspro(id: number): Observable<any> {
    return this.http.get<boolean>(`${environment.api}/Category/hasPro-` + id);
  }

  SearchCateByName(name:String):Observable<ApiResponse<categoryDtos[]>>{
    return this.http.post<ApiResponse<categoryDtos[]>>(`${environment.api}/Category/search-cate`, JSON.stringify(name), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
