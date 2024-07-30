// create-voucher-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-voucher-dialog',
  templateUrl: './create-voucher-dialog.component.html',
  styleUrls: ['./create-voucher-dialog.component.scss'],
})
export class CreateVoucherDialogComponent implements OnInit {
  inputdata: any;
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        name: ['', Validators.required],
        timeStart: ['', Validators.required],
        timeEnd: ['', Validators.required],
        discountType: ['', Validators.required],
        discount: ['', [Validators.required, Validators.min(0)]],
        min_Order_Value: ['', [Validators.required, Validators.min(0)]],
        maxDiscount: ['', [Validators.required, Validators.min(0)]],
        stock: ['', [Validators.required, Validators.min(0)]],
        status: ['', Validators.required],
      },
      { validators: this.timeRangeValidator }
    );
  }

  ngOnInit(): void {}
  saveVoucher(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
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
