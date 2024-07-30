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

  ngOnInit(): void {
    this.GetListVoucher();
  }
  ListVoucher: voucherDto[] = [];
  GetListVoucher() {
    return this.voucher
      .getData()
      .subscribe((data: ApiResponse<voucherDto[]>) => {
        console.log(data);
        this.ListVoucher = data.data;
      });
  }
  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Đang diễn ra';
      case 0:
        return 'Sắp diễn ra';
      case 2:
        return 'Đã kết thúc';
      default:
        return 'Không xác định';
    }
  }
}
