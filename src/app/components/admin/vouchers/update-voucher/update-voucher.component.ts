// update-voucher.component.ts
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoucherService } from '../../../../services/voucher.service';
import { ApiResponse } from '../../../../model/ApiResponse.model';
import { voucherDto } from '../../../../model/voucher.model';
declare var bootstrap: any;
@Component({
  selector: 'app-update-voucher',
  templateUrl: './update-voucher.component.html',
  styleUrls: ['./update-voucher.component.scss']
})
export class UpdateVoucherComponent implements OnInit, OnChanges {

  @Input() voucherId?: number;
  voucherForm: FormGroup;
  constructor(private service: VoucherService, private fb: FormBuilder) {
    this.voucherForm = this.fb.group({
      id: this.voucherId,
      name: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      discountType: ['', Validators.required],
      discount: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      min_Order_Value: ['', [Validators.required, Validators.min(0)]],
      maxDiscount: ['', [Validators.required, Validators.min(0)]],
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['voucherId'] && this.voucherId) {
      this.loadVoucher(this.voucherId);
    }
  }

  ngOnInit(): void {
   
  }

  loadVoucher(id: number) {
    this.service.getVoucherById(id).subscribe((response: ApiResponse<voucherDto>) => {
      const voucher = response.data;
      if (voucher) {
        this.voucherForm.patchValue({
          id: this.voucherId,
          name: voucher.name,
          timeStart: voucher.timeStart,
          timeEnd: voucher.timeEnd,
          discountType: voucher.discountType,
          discount: voucher.discount,
          stock: voucher.stock,
          min_Order_Value: voucher.min_Order_Value,
          maxDiscount: voucher.maxDiscount
        });
      }
    });
  }

  onSave() {
    console.log(this.voucherForm.value);

    if (this.voucherForm.valid) {

      this.service.UpdateVoucher(this.voucherForm.value).subscribe(res => {
        this.onCancel();
      });
    } else {
      this.voucherForm.markAllAsTouched();
    }
  }

  onCancel() {
    const modal = document.getElementById('staticBackdrop');
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    }
  }
}
