import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { blogDto, createblog } from '../model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }
  getData(page: number): Observable<ApiResponse<blogDto[]>> {
    return this.http.get<ApiResponse<blogDto[]>>(
      `${environment.api}/Blog/getall-blog-${page}`
    );
  }

  createblog(form:FormData): Observable<ApiResponse<createblog>>{
    return this.http.post<ApiResponse<createblog>>
    (`${environment.api}/Blog/create-blog`,form);
  }
}
