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
    constructor(private http: HttpClient) { }

    CreateVoucher(data: any) {
        return this.http.post(`${environment.api}/Voucher/create-voucher`, data);
    }
    getDataByStatus(status: number): Observable<ApiResponse<voucherDto[]>> {
        const params = new HttpParams().set('status', status.toString());

        return this.http.get<ApiResponse<voucherDto[]>>(`${environment.api}/Voucher/get-voucher-by-status`, { params });
    }
    getVoucherById(id: number): Observable<ApiResponse<voucherDto>> {
        return this.http.get<ApiResponse<voucherDto>>(`${environment.api}/Voucher/get-voucher-by-id?id=${id}`);
    }
    UpdateVoucher(data: any) {
        return this.http.put(`${environment.api}/Voucher/update-voucher`, data)
    }

    UpdateStatusVoucherById(id: number, status: number) {
        return this.http.patch(`${environment.api}/Voucher/update-status?id=${id}&status=${status}`, {});
    }
    SearchVoucher(search: string, status: number): Observable<ApiResponse<voucherDto[]>> {
        return this.http.get<ApiResponse<voucherDto[]>>(`${environment.api}/Voucher/search-vouchers?name=${search}&status=${status}`,{});
      }

}
