import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/ApiResponse.model';
import { Observable } from 'rxjs';
import { paymentDtos } from '../model/payment.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getData(): Observable<ApiResponse<paymentDtos[]>> {
    return this.http.get<ApiResponse<paymentDtos[]>>(
      `${environment.api}/PayMent/get-all`
    );
  }

  create(form: FormData): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${environment.api}/PayMent/create-payment`,
      form
    );
  }

  update(model: paymentDtos): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      `${environment.api}/PayMent/update-payment`,
      model
    );
  }

  updateStatus(id: number): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(
      `${environment.api}/PayMent/update-status-${id}`,
      ''
    );
  }
}
