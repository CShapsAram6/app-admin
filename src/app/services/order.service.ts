import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { orderCancelDetailDto, orderCanelDto, orderDetailDto, orderDto, orderRefundDetailDto, orderRefundDto, reasonDto } from '../model/order.model';
import { ApiResponse } from '../model/ApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}
  getData(): Observable<ApiResponse<orderDto[]>> {
    return this.http.get<ApiResponse<orderDto[]>>(`${environment.api}/Order/get-all`);
  }
  getOrderDetail(id : number): Observable<orderDetailDto> {
    return this.http.get<orderDetailDto>(`${environment.api}/Order/get-order-detail-${id}`);
  }

  confirmOrder(id: number) {
    return this.http.put(`${environment.api}/Order/confirm-order-${id}`, {})
  }

  cancelOrder(id: number, reason: string) {
    const reasonDto: reasonDto = {
      reasonCancel: reason
    }
    return this.http.put(`${environment.api}/Order/cancel-order-${id}`, reasonDto)
  }

  confirmDelivery(id: number) {
    return this.http.put(`${environment.api}/Order/confirm-delivery-${id}`, {})
  }

  cancelDelivery(id: number, reason: string) {
    const reasonDto: reasonDto = {
      reasonCancel: reason
    }
    return this.http.put(`${environment.api}/Order/cancel-delivery-${id}`, reasonDto)
  }

  getOrderCanel(): Observable<ApiResponse<orderCanelDto[]>> {
    return this.http.get<ApiResponse<orderCanelDto[]>>(`${environment.api}/Order/order-canel`);
  }

  getOrderCanelDetail(id: number): Observable<ApiResponse<orderCancelDetailDto>> {
    return this.http.get<ApiResponse<orderCancelDetailDto>>(`${environment.api}/Order/oder-cancel-detail-${id}`);
  }

  putConfirmOrderCancel(id: number) {
    return this.http.put<any>(`${environment.api}/Order/confirm-odercanel-${id}`, {})
  }

  putResetOrderCancel(id: number) {
    return this.http.put<any>(`${environment.api}/Order/reset-odercanel-${id}`, {})
  }

  getOrderRefund(): Observable<ApiResponse<orderRefundDto[]>> {
    return this.http.get<ApiResponse<orderRefundDto[]>>(`${environment.api}/Order/order-refund`);
  }

  getOrderRefundDetail(id: number): Observable<ApiResponse<orderRefundDetailDto>> {
    return this.http.get<ApiResponse<orderRefundDetailDto>>(`${environment.api}/Order/order-refundDetail-${id}`);
  }
}
