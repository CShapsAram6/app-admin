import { Component, OnInit } from '@angular/core';
import { voucherDto } from '../../../model/voucher.model';
import { VoucherService } from '../../../services/voucher.service';
import { ApiResponse } from '../../../model/ApiResponse.model';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss',
})
export class VouchersComponent implements OnInit {
  constructor(private voucher: VoucherService) {}
  selectedStatus: number = -1;
  isCreateMode : boolean = true;
  modalTitle: string ='Thêm khuyến mãi';
  seclectedVoucherId?: number ;
  openCreateMode() {
    this.isCreateMode = true;
    this.modalTitle = 'Thêm khuyến mãi'; 
  }
  openUpdateMode(voucherId: number) {
    this.isCreateMode = false;
    this.seclectedVoucherId =  voucherId;
  }
  
  ngOnInit(): void {
    this.GetListVoucherByStatus(this.selectedStatus);
  }
  ListVoucher: voucherDto[] = [];
 
  GetListVoucherByStatus(status: number) {
    this.selectedStatus = status; 
    this.voucher.getDataByStatus(status).subscribe((vouchers: ApiResponse<voucherDto[]>) => {
      this.ListVoucher = vouchers.data;
    });
  }
  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Đang diễn ra';
      case 0:
        return 'Sắp diễn ra';
      case 2:
        return 'Tạm ngưng';
      case 4:
        return 'Đã hủy';
      case 3:
        return 'Đã kết thúc';
      default:
        return 'Không xác định';
    }
  }
  isActive(status: number): boolean {
    return this.selectedStatus === status;
  }

 
}
