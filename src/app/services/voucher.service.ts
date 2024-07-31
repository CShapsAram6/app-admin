import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { ApiResponse } from "../model/ApiResponse.model";
import { voucherDto } from "../model/voucher.model";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root',
})
export class VoucherService {
    constructor(private http: HttpClient) {}

    CreateVoucher(data: any){
        return this.http.post(`${environment.api}/Voucher/create-voucher`,data);
    }
    getDataByStatus(status: number): Observable<ApiResponse<voucherDto[]>> {
        const params = new HttpParams().set('status', status.toString());
    
        return this.http.get<ApiResponse<voucherDto[]>>(`${environment.api}/Voucher/get-voucher-by-status`, { params });
      }
}
