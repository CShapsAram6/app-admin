import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { orderDetailDto, orderDto } from '../../../model/order.model';
import { tap } from 'rxjs';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { FormControl } from '@angular/forms';
import { log } from 'console';
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
  totalOrder: number = 0;
  feeOrder: number = 0;
  total: number = 0;
  discountOrder: number = 0;
  activeTab = 'Tất cả';
  currentPage = 1;
  limit = 10;
  tabsData: { [tab: string]: { currentPage: number, filteredOrders: orderDto[], count: number } } = {};
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
      this.totalOrder = (this.ordersDetail.total + this.ordersDetail.discount - this.ordersDetail.feeDelivery) * 1000;
      this.feeOrder = this.ordersDetail.feeDelivery * 1000;
      this.discountOrder = this.ordersDetail.discount * 1000;
      this.total = this.ordersDetail.total * 1000;
    })
  }

  loadOrders() {
    this.orderService.getData().subscribe((response) => {
      this.orders = response.data;
      this.filteredOrders = response.data;
      this.countOrder = this.orders.length;

      // Phân trang cho từng tab
      this.getTabs().forEach(tab => {
        this.tabsData[tab] = {
          currentPage: 1,
          filteredOrders: this.filterOrdersForTab(tab),
          count: this.filterOrdersForTab(tab).length
        };
      });

      this.updatePagination();
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

  reasonControl = new FormControl('');
  cancelOrder(){
    const selectedReason = this.reasonControl.value;
    if(selectedReason){
      this.orderService.cancelOrder(this.idOrder, selectedReason)
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
    const selectedReasonDelivery = this.reasonControl.value;
    if(selectedReasonDelivery){
      this.orderService.cancelDelivery(this.idOrder, selectedReasonDelivery)
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
  }

  getTabs() {
    return ['Tất cả', 'Chờ xử lý', 'Đang giao', 'Hoàn tất', 'Đã hủy'];
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.currentPage = this.tabsData[tab].currentPage;
    this.filteredOrders = this.tabsData[tab].filteredOrders;
    this.countOrder = this.tabsData[tab].count;
    this.updatePagination();
  }

  filterOrdersForTab(tab: string): orderDto[] {
    if (tab === 'Tất cả') {
      return this.orders;
    } else if (tab === 'Chờ xử lý') {
      return this.orders.filter(order => order.statusOrder === 0);
    } else if (tab === 'Đang giao') {
      return this.orders.filter(order => order.statusOrder === 1 && order.statusDelivery === 1);
    } else if (tab === 'Hoàn tất') {
      return this.orders.filter(order => order.statusOrder === 1 && order.statusDelivery === 2);
    } else if (tab === 'Đã hủy') {
      return this.orders.filter(order => (order.statusOrder === 1 && order.statusDelivery === 3) || order.statusOrder === 3);
    } else {
      return [];
    }
  }

  updatePagination() {
    const pageStart = (this.currentPage - 1) * this.limit;
    const pageEnd = pageStart + this.limit;
    this.filteredOrders = this.tabsData[this.activeTab].filteredOrders.slice(pageStart, pageEnd);
  }

  get totalPages(): number {
    return Math.ceil(this.tabsData[this.activeTab].count / this.limit);
  }

  generatePageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.tabsData[this.activeTab].currentPage = pageNumber;
    this.updatePagination();
  }
}
