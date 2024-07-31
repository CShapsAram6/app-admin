// update-voucher.component.ts
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoucherService } from '../../../../services/voucher.service';
import { ApiResponse } from '../../../../model/ApiResponse.model';
import { voucherDto } from '../../../../model/voucher.model';

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
    if (this.voucherForm.valid) {
      const updatedVoucher: voucherDto = this.voucherForm.value;
      // Call the service to update voucher with updatedVoucher
      // this.service.updateVoucher(this.voucherId, updatedVoucher).subscribe(...);
    }
  }

  onCancel() {
    // Logic to cancel or close the form
  }
}
