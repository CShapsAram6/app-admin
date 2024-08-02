import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OderRefund_ProductDetail, orderRefundDetailDto, orderRefundDto } from '../../../model/order.model';
declare var $: any; // Khai báo jQuery

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrl: './return.component.scss'
})
export class ReturnComponent {
  constructor (private orderService: OrderService) {}
  ngOnInit(): void {
    this.loadOrderRefund();
  }

  OderRefund: orderRefundDto[] = [];
  filteredOrderRefund: orderRefundDto[] = [];
  oderRefundDetail = {} as orderRefundDetailDto;
  CountOderRefund: number = 0;
  activeTab = 'Tất cả';

  loadOrderRefund() {
    this.orderService
      .getOrderRefund()
      .subscribe((res) => {
        this.OderRefund = res.data;
        this.CountOderRefund = this.OderRefund.length;
        this.filteredOrderRefund = this.OderRefund;
      });
  }
  

  async LoadOderRefundDetail(id: number) {
    await this.orderService
      .getOrderRefundDetail(id)
      .subscribe((res) => {
        this.oderRefundDetail = res.data;
      });
    console.log(this.oderRefundDetail);
  }

  getTabs() {
    return ['Tất cả', 'Chờ xử lý', 'Hoàn tất', 'Hoàn tiền'];
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.filterOrders();
    console.log(this.filteredOrderRefund);
  }



  filterOrders() {
    if (this.activeTab === 'Tất cả') {
      this.filteredOrderRefund = this.OderRefund;
      this.CountOderRefund = this.filteredOrderRefund.length;
    }
    else if (this.activeTab === 'Chờ xử lý') {
      this.filteredOrderRefund = this.OderRefund.filter(order => order.statusOrder === 4);
      this.CountOderRefund = this.filteredOrderRefund.length;
    }

    else if (this.activeTab === 'Hoàn tất') {
      this.filteredOrderRefund = this.OderRefund.filter(order => order.statusOrder === 5);
      this.CountOderRefund = this.filteredOrderRefund.length;
    }
  }

  closeModal(){
    $('#myModal').modal('hide');
  }
    
}
