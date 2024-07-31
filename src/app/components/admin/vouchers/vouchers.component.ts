import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { voucherDto } from '../../../model/voucher.model';
import { VoucherService } from '../../../services/voucher.service';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { UpdateVoucherComponent } from './update-voucher/update-voucher.component';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss',
})
export class VouchersComponent implements OnInit {

  @ViewChild(UpdateVoucherComponent) updateVoucherComponent!: UpdateVoucherComponent;
  constructor(private service: VoucherService) { }
  selectedStatus: number = -1;
  isCreateMode: boolean = true;
  modalTitle?: string;
  seclectedVoucherId?: number;
  currentStatus: number = 0;
  flag: boolean = true;
  openCreateMode() {
    this.isCreateMode = true;
    this.modalTitle = 'Thêm khuyến mãi';
  }
  openUpdateMode(voucherId: number) {
    this.isCreateMode = false;
    this.seclectedVoucherId = voucherId;
    this.modalTitle = 'Cập Nhật khuyến mãi';
    this.updateVoucherComponent.saveSuccess.subscribe(() => this.onVoucherSaved());
  }

  ngOnInit(): void {
    this.GetListVoucherByStatus(this.selectedStatus);
  }
  ListVoucher: voucherDto[] = [];

  RemoveVoucher(voucherId: number, status: number) {
    const newStatus = status === 0 ? 4 : 3;

    this.service.UpdateStatusVoucherById(voucherId, newStatus).subscribe({
      next: (response) => {
        console.log(newStatus);
        this.GetListVoucherByStatus(this.selectedStatus);
      },
      error: (err) => {
        console.error('Failed to update status', err);
      }
    });
  }
  updateVoucherStatus(voucherId: number, currentStatus: number) {
    let newStatus: number;
    switch (currentStatus) {
      case 0:
        newStatus = 1;
        break;
      case 1:
        newStatus = 2;
        break;
      case 2:
        newStatus = 1;
        break;
      default:
        newStatus = 1;
    }

    this.service.UpdateStatusVoucherById(voucherId, newStatus).subscribe({
      next: (response) => {
        console.log(newStatus);
        this.GetListVoucherByStatus(this.selectedStatus);
      },
      error: (err) => {
        console.error('Failed to update status', err);
      }
    });
  }


  GetListVoucherByStatus(status: number) {
    this.selectedStatus = status;
    this.service.getDataByStatus(status).subscribe((vouchers: ApiResponse<voucherDto[]>) => {
      this.ListVoucher = vouchers.data;
    });
  }
  getStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Sắp diễn ra';
      case 1:
        return 'Đang diễn ra';
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
  getStopClass(status: number): string {
    switch (status) {
      case 0:
        return 'far fa-trash-alt';
      case 1:
        return 'fa-solid fa-stop';
      case 2:
        return 'fa-solid fa-stop';
      default:
        return 'fa-solid fa-question';
    }
  }
  getStatusClass(status: number): string {
    switch (status) {
      case 0:
        return 'fa-solid fa-play';
      case 1:
        return 'fa-solid fa-pause';
      case 2:
        return 'fa-solid fa-play';
      case 3:
        return 'fa-solid fa-stop';
      default:
        return 'fa-solid fa-question';
    }
  }
  onVoucherSaved() {
    this.GetListVoucherByStatus(this.selectedStatus);
  }



}
