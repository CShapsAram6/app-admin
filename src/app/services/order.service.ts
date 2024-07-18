import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { orderDetailDto, orderDto } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}
  getData(): Observable<orderDto[]> {
    return this.http.get<orderDto[]>(`${environment.api}/Order`);
  }
  getOrderDetail(id : number): Observable<orderDetailDto> {
    return this.http.get<orderDetailDto>(`${environment.api}/Order/get-order-detail-${id}`);
  }

  confirmOrder(id: number) {
    return this.http.put(`${environment.api}/Order/confirm-order-${id}`, {})
  }

  cancelOrder(id: number) {
    return this.http.put(`${environment.api}/Order/cancel-order-${id}`, {})
  }

  confirmDelivery(id: number) {
    return this.http.put(`${environment.api}/Order/confirm-delivery-${id}`, {})
  }

  cancelDelivery(id: number) {
    return this.http.put(`${environment.api}/Order/cancel-delivery-${id}`, {})
  }
}
