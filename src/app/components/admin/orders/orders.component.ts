import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { orderDto } from '../../../model/order.model';

interface Order {
  id: number;
  ten: string;
  trangThaiThanhToan: string;
  tongTien: number;
  ngayDat: string;
  trangThaiDonHang: string;
}


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  constructor (private order: OrderService) {}
  ngOnInit(): void {
    this.loadOrders();

  }

  countOrder: number = 0;
  activeTab = 'Tất cả';
  orders: orderDto[] = [];
  filteredOrders: orderDto[] = [];

  clickOrder(id: number) {
    console.log(id);
  }

  loadOrders() {
    this.order.getData().subscribe((data) => {
      this.orders = data;
      this.filteredOrders = data;
      this.countOrder = this.orders.length;
    });
  }

  getTabs() {
    return ['Tất cả', 'Chờ xử lý', 'Đang giao', 'Hoàn tất', 'Đã hủy'];
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.filterOrders();
  }

  filterOrders() {
    if (this.activeTab === 'Tất cả') {
      this.filteredOrders = this.orders;
      this.countOrder = this.orders.length;
    }
    else if (this.activeTab === 'Chờ xử lý') {
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 1);
      this.countOrder = this.orders.filter(order => order.statusOrder === 1).length;
    }
    else if (this.activeTab === 'Đang giao') {
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 2);
      this.countOrder = this.orders.filter(order => order.statusOrder === 2).length;
    }
    else if (this.activeTab === 'Hoàn tất') {
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 3);
      this.countOrder = this.orders.filter(order => order.statusOrder === 3).length;
    }
    else if (this.activeTab === 'Đã hủy') {
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 4);
      this.countOrder = this.orders.filter(order => order.statusOrder === 4).length;
    }
  }
}
