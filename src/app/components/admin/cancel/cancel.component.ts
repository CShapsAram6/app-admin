import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { orderCancelDetailDto, orderCanelDto, orderDto } from '../../../model/order.model';
import { allowedNodeEnvironmentFlags } from 'process';
declare var $: any; // Khai báo jQuery

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.scss'
})
export class CancelComponent implements OnInit {
  constructor (private orderService: OrderService) {}
  ngOnInit(): void {
    this.loadOrderCancel();
  }

  orderCanel: orderCanelDto[] = [];
  filteredOrderCancel: orderCanelDto[] = [];
  oderCanelDetail = {} as orderCancelDetailDto;
  countOrder: number = 0;
  activeTab = 'Tất cả';

  async loadOrderCancel() {
    this.orderService
      .getOrderCanel()
      .subscribe((res) => {
        this.orderCanel = res.data;
        this.filteredOrderCancel = this.orderCanel;
        this.countOrder = this.filteredOrderCancel.length;
      });
  }

  async LoadOderCanelDetail(id: number) {
    await this.orderService
      .getOrderCanelDetail(id)
      .subscribe((res) => {
        this.oderCanelDetail = res.data;
        console.log(this.oderCanelDetail.reasonCancel.title);
      });
  }

  getTabs() {
    return ['Tất cả', 'Chờ xử lý', 'Đã hủy'];
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.filterOrders();
  }

  

  filterOrders() {
    if (this.activeTab === 'Tất cả') {
      this.filteredOrderCancel = this.orderCanel;
      this.countOrder = this.filteredOrderCancel.length;
    }
    else if (this.activeTab === 'Chờ xử lý') {
      this.filteredOrderCancel = this.orderCanel.filter(order => order.statusOrder === 2);
      this.countOrder = this.filteredOrderCancel.length;
    }
    
    else if (this.activeTab === 'Đã hủy') {
      this.filteredOrderCancel = this.orderCanel.filter(order => order.statusOrder === 3);
      this.countOrder = this.filteredOrderCancel.length;
    }
  }

  closeModal(){
    $('#myModal').modal('hide');
  }
  ConfirmOrderCancel(id: number) {
    this.orderService
      .putConfirmOrderCancel(id)
      .subscribe(
        (res) => {
          alert('Xử lý đơn hàng thành công!');
          this.closeModal();
          this.loadOrderCancel();
        }
      );
  }

  ResetOrderCancel(id: number) {
    this.orderService
      .putResetOrderCancel(id)
      .subscribe(
        (res) => {
          if(res.success == true){
            alert('Đặt lại đơn hàng thành công!');
            this.closeModal();
            this.loadOrderCancel();
          } else {
            alert('Đặt lại đơn hàng thất bại!');
          }
        }
      );
  }

  
}
