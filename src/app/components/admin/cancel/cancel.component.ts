import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { orderDto } from '../../../model/order.model';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.scss'
})
export class CancelComponent {
  constructor (private order: OrderService) {}
  ngOnInit(): void {
    this.loadOrderCanel();

  }
  countOrder: number = 0;
  orderCanel: orderDto[] = [];
  loadOrderCanel() {
    this.order.getOrderCanel().subscribe((data) => {
      this.orderCanel = data;
      this.countOrder = this.orderCanel.length;
    });
  }
}
