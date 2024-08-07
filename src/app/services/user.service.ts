import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../environment/environment';
import { pagesDtos } from '../model/products.model';
import { GetUserId, QLUser } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetallUserAdmin(page:number):Observable<ApiResponse<QLUser[]>>{
    return this.http.get<ApiResponse<QLUser[]>>(`${environment.api}/User/Get-All-UserAdmin-${page}`);
  }

  countUser(name:FormData):Observable<ApiResponse<number>>{
    return this.http.post<ApiResponse<number>>(`${environment.api}/User/getNumber-User`,name);
  }

  SearchUser(request:pagesDtos):Observable<ApiResponse<QLUser[]>>{
    return this.http.post<ApiResponse<QLUser[]>>(`${environment.api}/User/search-User`,request);
  }
  UpdateStatus(id:number , status:boolean):Observable<ApiResponse<number>>{
    return this.http.patch<ApiResponse<number>>(`${environment.api}/User/updateUser-status?id=${id}&status=${status}`, {})
  }

  GetUserId(id:number):Observable<ApiResponse<GetUserId>>{
    return this.http.get<ApiResponse<GetUserId>>(`${environment.api}/User/GetUserId-${id}`);
  }
}
 