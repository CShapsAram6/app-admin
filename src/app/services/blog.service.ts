import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { blogDto, createblog, pageBlogDtos, updateblog } from '../model/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  
  getData(page: number): Observable<ApiResponse<blogDto[]>> {
    return this.http.get<ApiResponse<blogDto[]>>(
      `${environment.api}/Blog/getall-blog-${page}`
    );
  }

  createblog(form: FormData): Observable<ApiResponse<createblog>> {
    return this.http.post<ApiResponse<createblog>>(
      `${environment.api}/Blog/create-blog`,
      form
    );
  }

  countblog(name:FormData):Observable<ApiResponse<number>>{
    return this.http.post<ApiResponse<number>>(`${environment.api}/Blog/getNumber-blog`,name);
  }

  //sửa blog
  GetBlogid(id:number):Observable<ApiResponse<updateblog>>{
    return this.http.get<ApiResponse<updateblog>>(`${environment.api}/Blog/Get-blog-${id}`);
  }

  updateblog(id:number, form:FormData):Observable<ApiResponse<updateblog>>{
    return this.http.put<ApiResponse<updateblog>>(`${environment.api}/Blog/Update-blog-${id}`,form);
  }
  deleteblog(id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.api}/Blog/deleteblog-` + id
    );
  }
  SearchBlogName(request: pageBlogDtos
  ): Observable<ApiResponse<blogDto[]>> {
    return this.http.post<ApiResponse<blogDto[]>>(
      `${environment.api}/Blog/search-blog`,
      request
    );
  }

}

// cc
