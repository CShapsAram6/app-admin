// update-voucher.component.ts
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoucherService } from '../../../../services/voucher.service';
import { ApiResponse } from '../../../../model/ApiResponse.model';
import { voucherDto } from '../../../../model/voucher.model';
import { map, Observable } from 'rxjs';
import { discountValidator } from './custome';
declare var bootstrap: any;
@Component({
  selector: 'app-update-voucher',
  templateUrl: './update-voucher.component.html',
  styleUrls: ['./update-voucher.component.scss']
})
export class UpdateVoucherComponent implements OnInit, OnChanges {

  @Output() saveSuccess = new EventEmitter<void>();
  @Input() voucherId?: number;
  voucherForm: FormGroup;
  currentStatus: number = 0;
  constructor(private service: VoucherService, private fb: FormBuilder) {
    this.voucherForm = this.fb.group({
      id: this.voucherId,
      status: ['', [Validators.required, Validators.min(0)]],
      name: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      discountType: ['', Validators.required],
      discount: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      min_Order_Value: ['', [Validators.required, Validators.min(0)]],
      max_Discount: ['', [Validators.required, Validators.min(0)]],
    }, { validators: discountValidator() });
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
          status: voucher.status,
          name: voucher.name,
          timeStart: voucher.timeStart,
          timeEnd: voucher.timeEnd,
          discountType: voucher.discountType,
          discount: voucher.discount,
          stock: voucher.stock,
          min_Order_Value: voucher.min_Order_Value,
          max_Discount: voucher.max_Discount
        });
      }
      
    });
  }

  onSave() {
    console.log(this.voucherForm.value);

    if (this.voucherForm.valid) {

      this.service.UpdateVoucher(this.voucherForm.value).subscribe(res => {
        this.onCancel();
        this.saveSuccess.emit();

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
