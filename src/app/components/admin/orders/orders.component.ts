import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { orderDetailDto, orderDto } from '../../../model/order.model';
import { tap } from 'rxjs';
import { ApiResponse } from '../../../model/ApiResponse.model';
declare var $: any; // Khai báo jQuery


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  constructor (private orderService: OrderService) {}
  ngOnInit(): void {
    this.loadOrders();
  }

  idOrder: number = 0;
  countOrder: number = 0;
  activeTab = 'Tất cả';
  //get all order
  orders: orderDto[] = [];
  //get order detail
  ordersDetail!: orderDetailDto ;
  //filter order
  filteredOrders: orderDto[] = [];

  loadOrderDetail(id: number) {
    console.log(id);
    this.idOrder = id;
    this.orderService.getOrderDetail(id).subscribe((data) => {
      this.ordersDetail = data;
      console.log(this.ordersDetail);
    })
  }

  loadOrders() {
    this.orderService.getData().subscribe((response) => {
      this.orders = response.data;
      this.filteredOrders = response.data;
      this.countOrder = this.orders.length;
      console.log(response);
    });
  }

  closeModal(){
    $('#myModal').modal('hide');
  }
  confirmOrder() {
    if (!this.idOrder) {
      console.error('ID đơn hàng không hợp lệ.');
      return;
    }
    this.orderService.confirmOrder(this.idOrder)
      .pipe(
        tap(
          () => {
            alert('Xác nhận đơn hàng thành công!');
            this.closeModal()
            this.loadOrders()
          },
          (error) => {
            alert('Xác nhận đơn hàng thất bại!');
            console.error('Lỗi khi xác nhận đơn hàng:', error);
          }
        )
      )
      .subscribe();
  }

  cancelOrder(){
    if (!this.idOrder) {
      console.error('ID đơn hàng không hợp lệ.');
      return;
    }
    this.orderService.cancelOrder(this.idOrder)
      .pipe(
        tap(
          () => {
            alert('Hủy đơn hàng thành công!');
            this.closeModal()
            this.loadOrders()
          },
          (error) => {
            alert('Hủy đơn hàng thất bại!');
            console.error('Lỗi khi hủy đơn hàng:', error);
          }
        )
      )
      .subscribe();
  }

  confirmDelivery(){
    if (!this.idOrder) {
      console.error('ID đơn hàng không hợp lệ.');
      return;
    }
    this.orderService.confirmDelivery(this.idOrder)
      .pipe(
        tap(
          () => {
            alert('Xác nhận giao hàng thành công!');
            this.closeModal()
            this.loadOrders()
          },
          (error) => {
            alert('Xác nhận giao hàng thát bại!');
            console.error('Lỗi khi xác nhận giao hàng:', error);
          }
        )
      )
      .subscribe();
  }

  cancelDelivery(){
    if (!this.idOrder) {
      console.error('ID đơn hàng không hợp lệ.');
      return;
    }
    this.orderService.cancelDelivery(this.idOrder)
      .pipe(
        tap(
          () => {
            alert('Hủy giao hàng thành công!');
            this.closeModal()
            this.loadOrders()
          },
          (error) => {
            alert('Hủy giao hàng thất bại!');
            console.error('Lỗi khi hủy giao hàng:', error);
          }
        )
      )
      .subscribe();
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
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 0);
      this.countOrder = this.orders.filter(order => order.statusOrder === 0).length;
    }
    else if (this.activeTab === 'Đang giao') {
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 1 && order.statusDelivery === 1);
      this.countOrder = this.orders.filter(order => order.statusOrder === 1 && order.statusDelivery === 1).length;
    }
    else if (this.activeTab === 'Hoàn tất') {
      this.filteredOrders = this.orders.filter(order => order.statusOrder === 1 && order.statusDelivery === 2);
      this.countOrder = this.orders.filter(order => order.statusOrder === 1 && order.statusDelivery === 2).length;
    }
    else if (this.activeTab === 'Đã hủy') {
      this.filteredOrders = this.orders.filter(order => (order.statusOrder === 1 && order.statusDelivery === 3) || order.statusOrder === 3);
      this.countOrder = this.orders.filter(order => (order.statusOrder === 1 && order.statusDelivery === 3) || order.statusOrder === 3).length;
    }
  }
}
