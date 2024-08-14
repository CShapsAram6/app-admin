import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function discountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const discountType = control.get('discountType')?.value;
    const discount = control.get('discount')?.value;
    const maxDiscount = control.get('max_Discount')?.value;

    if (discountType === 'percent') {
      return discount > 0 && discount <= 100 ? null : { invalidPercentDiscount: true };
    } else if (discountType === 'direct') {
      return discount === maxDiscount ? null : { invalidDirectDiscount: true };
    }
    return null;
  };
}
