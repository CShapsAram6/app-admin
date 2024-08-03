import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse.model';
import { RatioOrderDto, StatisticalDto, StatisticalReponse, TopProductDto } from '../model/statistical.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  constructor(private http: HttpClient) { }

  getData(): Observable<ApiResponse<StatisticalDto>> {
    return this.http.get<ApiResponse<StatisticalDto>>(`${environment.api}/Statistical/get-total-statistical`);
  }
  getRevenue(year: number): Observable<ApiResponse<StatisticalReponse>> {
    return this.http.get<ApiResponse<StatisticalReponse>>(`${environment.api}/Statistical/RevenueByYear-${year}`);
  }

  getRevenueByMonthYear(year: number, month: number): Observable<ApiResponse<StatisticalReponse>> {
    return this.http.get<ApiResponse<StatisticalReponse>>(`${environment.api}/Statistical/Revenue-${month}-${year}`);
  }

  getTopProduct(): Observable<ApiResponse<TopProductDto[]>> {
    return this.http.get<ApiResponse<TopProductDto[]>>(`${environment.api}/Statistical/get-top-product`);
  }

  getRatioOrder(): Observable<ApiResponse<RatioOrderDto>> {
    return this.http.get<ApiResponse<RatioOrderDto>>(`${environment.api}/Statistical/ratio-order`);
  }

  getTotalOrder(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${environment.api}/Statistical/total-order`);
  }
}
