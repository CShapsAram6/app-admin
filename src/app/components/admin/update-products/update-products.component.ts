import { Component, OnInit } from '@angular/core';
import { AiGenderService } from '../../../services/ai-gender.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from '../../../model/ApiResponse.model';
import {
  variant,
  categoryDtos,
  shared,
  variantResponse,
} from '../../../model/category.model';
import {
  productsModel,
  productCreateRequest,
  imageDtos,
  productsUpdateDtos,
} from '../../../model/products.model';
import { CategorysService } from '../../../services/categorys.service';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.scss',
})
export class UpdateProductsComponent implements OnInit {
  constructor(
    private ai: AiGenderService,
    private categorysServices: CategorysService,
    private form: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute
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
  // varian reponse
  arrayVariant: variantResponse[] = [];
  // array images response
  arrImage: imageDtos[] = [];
  // form size
  formSize = this.form.group({
    size: ['', Validators.required],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    id: [''],
  });
  // list size
  sizes: string[] = ['1', '2', '3'];
  // list category
  categorys: categoryDtos[] = [];

  isButtonUpdate: boolean = false;
  isLoadingSumbit: boolean = false;
  ngOnInit(): void {
    this.formSize.get('size')!.setValue(this.sizes[0]);
    forkJoin([this.LoadCategory(), this.LoadProduct()]).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  LoadCategory() {
    return this.categorysServices.getData().pipe(
      tap((res: ApiResponse<categoryDtos[]>) => {
        this.categorys = res.data;
        this.category = this.categorys[0].id.toString();
      })
    );
  }
  // render product form serve to form input
  LoadProduct() {
    const idParameter: number = this.route.snapshot.params['id'];
    return this.productsService.getOnlyProduct(idParameter).pipe(
      tap((res) => {
        this.name = res.data.name;
        this.category = res.data.category.toString();
        this.arrayVariant = res.data.variant;
        this.describe = res.data.description;
        this.arrImage = res.data.images;
      })
    );
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
  Update() {
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

    this.productsService;
    const idParameter: number = this.route.snapshot.params['id'];
    this.productsService
      .update(form, idParameter)
      .subscribe((res: ApiResponse<productsUpdateDtos>) => {
        if (res.success) {
          this.isLoadingSumbit = false;
          this.ngOnInit();
          this.imageUrls = [];
          alert('Cập nhật thành công');
        }
      });
  }

  // Mount the value form variant
  IsMountFormVariant(item: variantResponse) {
    this.isButtonUpdate = true;
    this.formSize.setValue({
      size: item.size.toString(),
      price: item.price.toString(),
      quantity: item.quantity.toString(),
      id: item.id.toString(),
    });
  }
  SaveChangeVatiant() {
    let vartiant: variantResponse = productsModel.MapToVariant(
      this.formSize.value as variant
    );
    this.productsService.updateVariant(vartiant).subscribe((response) => {
      if (response.success) {
        this.isButtonUpdate = false;
        this.ngOnInit();
        this.resetForm();
        return;
      }
      console.log(response);
    });
  }

  cancelForm() {
    this.isButtonUpdate = false;
    this.resetForm();
  }
  resetForm() {
    this.formSize.setValue({
      size: this.sizes[0].toString(),
      price: '',
      quantity: '',
      id: '',
    });
  }
}
