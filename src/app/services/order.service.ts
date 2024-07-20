import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { orderDto } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}
  getData(): Observable<orderDto[]> {
    return this.http.get<orderDto[]>(`${environment.api}/Order`);
  }

  getOrderCanel(): Observable<orderDto[]> {
    return this.http.get<orderDto[]>(`${environment.api}/Order/order-canel`);
  }
}
