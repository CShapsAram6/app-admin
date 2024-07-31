// update-voucher.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoucherService } from '../../../../services/voucher.service';
import { ApiResponse } from '../../../../model/ApiResponse.model';
import { voucherDto } from '../../../../model/voucher.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-voucher',
  templateUrl: './update-voucher.component.html',
  styleUrls: ['./update-voucher.component.scss']
})
export class UpdateVoucherComponent implements OnInit {

  voucherId: number = 0;
  voucherForm: FormGroup;
  constructor(private service: VoucherService, private fb: FormBuilder,private route: ActivatedRoute ) {
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
    this.route.params.subscribe(params=>{
      this.voucherId = +params['id'];
      if(this.voucherId)
      {
        this.loadVoucher(this.voucherId);
      }
    })
  }

  ngOnInit(): void {
    if(this.voucherId)
    {
      this.voucherId= this.route.snapshot.params['id'];
      this.loadVoucher(this.voucherId);
    }
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
