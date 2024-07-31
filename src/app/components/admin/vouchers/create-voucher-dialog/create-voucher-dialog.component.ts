// create-voucher-dialog.component.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { VoucherService } from '../../../../services/voucher.service';


declare var bootstrap: any;


@Component({
  selector: 'app-create-voucher-dialog',
  templateUrl: './create-voucher-dialog.component.html',
  styleUrls: ['./create-voucher-dialog.component.scss'],
})
export class CreateVoucherDialogComponent implements OnInit {
  inputdata: any;
  myForm: FormGroup;
  minDate: string;


  constructor(private fb: FormBuilder, private service: VoucherService) {
    this.myForm = this.fb.group(
      {
        name: ['', Validators.required],
        timeStart: ['', Validators.required],
        timeEnd: ['', Validators.required],
        discountType: ['', Validators.required],
        discount: ['', [Validators.required, Validators.min(0)]],
        min_Order_Value: ['', [Validators.required, Validators.min(0)]],
        max_Discount: ['', [Validators.required, Validators.min(0)]],
        stock: ['', [Validators.required, Validators.min(0)]],
        status: [1, Validators.required],
      },
      { validators: this.timeRangeValidator }
    );
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);

    this.minDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  close(): void {
    const modal = document.getElementById('staticBackdrop');
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    }
  }
  
  ngOnInit(): void { }
  saveVoucher(): void {
    if (this.myForm.valid) {

      console.log(this.myForm.value);
      this.service.CreateVoucher(this.myForm.value).subscribe(res => {
        this.close();
      });
    } else {
      this.myForm.markAllAsTouched();
    }
  }

  private timeRangeValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const timeStart = control.get('timeStart')?.value;
    const timeEnd = control.get('timeEnd')?.value;
    return timeStart && timeEnd && timeStart >= timeEnd
      ? { timeRangeInvalid: true }
      : null;
  }
}
