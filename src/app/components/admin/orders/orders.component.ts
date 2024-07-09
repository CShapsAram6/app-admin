import { Component, OnInit } from '@angular/core';

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
  ngOnInit() {}

  activeTab = 'Tất cả';
  orders: Order[] = [
    { id: 1, ten: 'Nguyễn Thanh Huy', trangThaiThanhToan: 'Đã thanh toán', tongTien: 2000000, ngayDat: '20/20/2002', trangThaiDonHang: 'Hoàn tất' },
    { id: 2, ten: 'Trần Văn An', trangThaiThanhToan: 'Chưa thanh toán', tongTien: 1500000, ngayDat: '19/12/2023', trangThaiDonHang: 'Chờ xử lý' },
    { id: 3, ten: 'Lê Thị Hoa', trangThaiThanhToan: 'Đã thanh toán', tongTien: 3000000, ngayDat: '18/11/2023', trangThaiDonHang: 'Đang giao' },
    { id: 4, ten: 'Phạm Minh Tuấn', trangThaiThanhToan: 'Đã thanh toán', tongTien: 1200000, ngayDat: '17/10/2023', trangThaiDonHang: 'Hoàn tất' },
    { id: 5, ten: 'Vũ Thị Lan', trangThaiThanhToan: 'Chưa thanh toán', tongTien: 2500000, ngayDat: '16/09/2023', trangThaiDonHang: 'Đã hủy' },
    { id: 6, ten: 'Hoàng Văn Nam', trangThaiThanhToan: 'Đã thanh toán', tongTien: 1800000, ngayDat: '15/08/2023', trangThaiDonHang: 'Chờ xử lý' },
    { id: 7, ten: 'Đặng Thị Mai', trangThaiThanhToan: 'Chưa thanh toán', tongTien: 3200000, ngayDat: '14/07/2023', trangThaiDonHang: 'Đang giao' },
    { id: 8, ten: 'Bùi Văn Công', trangThaiThanhToan: 'Đã thanh toán', tongTien: 2100000, ngayDat: '13/06/2023', trangThaiDonHang: 'Hoàn tất' },
    { id: 9, ten: 'Ngô Thị Hà', trangThaiThanhToan: 'Đã thanh toán', tongTien: 1700000, ngayDat: '12/05/2023', trangThaiDonHang: 'Đã hủy' },
    { id: 10, ten: 'Dương Văn Đức', trangThaiThanhToan: 'Chưa thanh toán', tongTien: 2800000, ngayDat: '11/04/2023', trangThaiDonHang: 'Chờ xử lý' }
  ];

  filteredOrders: any[] = this.orders;


  getTabs() {
    return ['Tất cả', 'Chờ xử lý', 'Đang giao', 'Hoàn tất', 'Đã hủy'];
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(this.activeTab);
    this.filterOrders();
    console.log(this.filteredOrders);
  }

  filterOrders() {
    if (this.activeTab === 'Tất cả') {
      this.filteredOrders = this.orders
    }
    else{
      this.filteredOrders = this.orders.filter(order => order.trangThaiDonHang === this.activeTab);
    }
  }
}
