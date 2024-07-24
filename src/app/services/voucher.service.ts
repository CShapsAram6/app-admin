import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http'; 
import { ApiResponse } from "../model/ApiResponse.model";
import { voucherDto } from "../model/voucher.model";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root',
})
export class VoucherService {
    constructor(private http: HttpClient) {}

    getData(): Observable<ApiResponse<voucherDto[]>> {
        return this.http.get<ApiResponse<voucherDto[]>>(`${environment.api}/Voucher/get-all`);
    }
}
