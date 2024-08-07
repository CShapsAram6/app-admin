import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { variant, variantResponse } from '../../../model/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { productsModel } from '../../../model/products.model';
import { VariantService } from '../../../services/variant.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrl: './variant.component.scss',
})
export class VariantComponent implements OnInit {
  constructor(
    private productsService: VariantService,
    private route: ActivatedRoute,
    private form: FormBuilder
  ) { }
  arrVariant: variantResponse[] = [];
  transFormCreate: string = 'translateX(-100%)';
  formVariant = this.form.group({
    size: ['', [Validators.required]],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    id: [''],
  });

  arrSize: { size: number }[] = [
    { size: 1 },
    { size: 2 },
    { size: 3 },
    { size: 4 },
    { size: 5 },
  ];

  ngOnInit(): void {
    this.formVariant.get('size')?.setValue(this.arrSize[0].size.toString());
    this.LoadPage();
  }

  LoadPage() {
    const idParameter: number = this.route.snapshot.params['id'];
    this.formVariant.get('id')?.setValue(idParameter.toString());
    this.productsService.getVariantByIdProduct(idParameter).subscribe((res) => {
      this.arrVariant = res.data;
    });
  }

  ChangeTransForm(type: string) {
    if (type.trim() == 'create') {
      this.transFormCreate = 'translateX(-200%)';
      return;
    }
    this.transFormCreate = 'translateX(0%)';
  }

  LoadFormUpdate(item: variantResponse) {
    this.formVariant.setValue({
      size: item.size.toString(),
      quantity: item.quantity.toString(),
      price: item.price.toString(),
      id: item.id.toString(),
    });
  }

  // event sumbit
  onSubmit(type: string) {
    if (type.trim() == 'create') {
      this.CreateVariant();
      return;
    }
    this.UpdateVariant();
  }
  // create variant by id product
  CreateVariant() {
    let request: variant = this.formVariant.value as variant;
    this.productsService.createVariant(request).subscribe((res) => {
      if (res.success) {
        this.transFormCreate = 'translateX(-100%)';
        this.LoadPage();
        this.ResetForm();
        return;
      }
      console.log(res);
      alert('Thất bại');
    });
  }

  UpdateVariant() {
    let request: variantResponse = productsModel.MapToVariant(
      this.formVariant.value as variant
    );
    this.productsService.updateVariant(request).subscribe((res) => {
      if (res.success) {
        this.transFormCreate = 'translateX(-100%)';
        this.LoadPage();
        this.ResetForm();
        return;
      }
      console.log(res);
      alert('Thất bị');
    });
  }

  ResetForm() {
    this.formVariant.setValue({
      size: this.arrSize[0].size.toString(),
      quantity: '',
      price: '',
      id: '',
    });
  }

  UpdateStatusVariant(id: number) {
    this.productsService.updateStatusVariant(id).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
        alert('Cập nhật thành công');
        return;
      }
      alert('Cập nhật thất bại');
      console.log(res);
    });
  }
  DeleteVariant(id: number) {
    this.productsService.DeleteVariant(id).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
        alert('Xóa nhật thành công');
        return;
      }
      alert('Cập nhật thất bại');
      console.log(res);
    });
  }
}
