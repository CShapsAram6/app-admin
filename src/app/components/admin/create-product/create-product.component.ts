import { Component, OnInit } from '@angular/core';
import { AiGenderService } from '../../../services/ai-gender.service';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos, shared, variant } from '../../../model/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, share } from 'rxjs';
import {
  productCreateRequest,
  productsModel,
} from '../../../model/products.model';
import { ProductsService } from '../../../services/products.service';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../../../model/ApiResponse.model';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  constructor(
    private ai: AiGenderService,
    private categorysServices: CategorysService,
    private form: FormBuilder,
    private productsService: ProductsService
  ) {}
  prompt: string = 'Mô tả về cây thông trồng trong nhà ngắn gọn';
  aiResponse: string = '';
  // describe products
  describe: string = '';
  isLoading: boolean = false;
  // array image
  imageUrls: { url: string; index: number; file: File }[] = [];
  // model name product
  name: string = '';
  // model category
  category: string = '';
  // list object size
  listSize: variant[] = [];
  // form size
  formSize = this.form.group({
    size: ['', Validators.required],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
  });
  // list size
  sizes: string[] = ['1', '2', '3'];
  // list category
  categorys: categoryDtos[] = [];
  isLoadingSumbit: boolean = false;
  ngOnInit(): void {
    this.LoadCategory();
  }
  LoadCategory() {
    this.formSize.get('size')!.setValue(this.sizes[0]);

    this.categorysServices.getData().subscribe((res) => {
      this.categorys = res;
      this.category = this.categorys[0].id.toString();
    });
  }
  CreateDes() {
    this.isLoading = true;
    this.ai.callAI(this.prompt).subscribe((res) => {
      if (res) {
        this.isLoading = false;
      }
      this.aiResponse = res['candidates'][0]['content']['parts'][0]['text'];
    });
  }

  BntUsing(item: string) {
    this.describe = item;
    this.aiResponse = '';
  }

  // Lấy thông tin hình ảnh
  onFilesSelected(event: any) {
    this.imageUrls = [];
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push({
          url: reader.result as string,
          index: i,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  RemoveItem(index: number) {
    this.imageUrls = this.imageUrls.filter((_, i) => i !== index);
  }
  RemoveSize(item: variant) {
    const index = this.listSize.findIndex((a) => item.id === a.id);
    this.listSize = this.listSize.filter((_, i) => i !== index);
  }

  // sumbit form
  OnSumbit() {
    let data: variant = this.formSize.value as variant;
    data.id = shared.getRandomString(3);
    this.listSize.push(data);
  }
  // call api create product
  Create() {
    this.isLoadingSumbit = true;
    let form: FormData = productsModel.formRequest(
      this.name,
      this.describe,
      this.listSize,
      this.category
    );
    for (let item of this.imageUrls) {
      form.append('model.Images', item.file);
    }

    this.productsService
      .create(form)
      .subscribe((res: ApiResponse<productCreateRequest>) => {
        if (res.success) {
          this.isLoadingSumbit = false;
          alert('Thêm thành công');
        }
      });
  }
}
