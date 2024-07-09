import { Component, OnInit } from '@angular/core';
import { AiGenderService } from '../../../services/ai-gender.service';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos, shared, variant } from '../../../model/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { share } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  constructor(
    private ai: AiGenderService,
    private categorysServices: CategorysService,
    private form: FormBuilder
  ) {}
  list: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  prompt: string = 'Mô tả về cây thông trồng trong nhà ngắn gọn';
  desption: string = '';
  describe: string = '';
  isLoading: boolean = false;
  imageUrls: { url: string; index: number; file: File }[] = [];

  // list object size
  listSize: variant[] = [];
  // form size
  formSize = this.form.group({
    size: ['', Validators.required],
    price: [
      '',
      [Validators.required, Validators.maxLength(3), Validators.minLength(2)],
    ],
    quantity: ['', [Validators.required, Validators.maxLength(3)]],
  });
  // list size
  sizes: string[] = ['Lớn', 'Vừa', 'Nhỏ'];
  // list category
  categorys: categoryDtos[] = [];
  ngOnInit(): void {
    this.LoadCategory();
  }
  LoadCategory() {
    this.formSize.get('size')!.setValue(this.sizes[0]);
    this.categorysServices.getData().subscribe((res) => {
      this.categorys = res;
    });
  }
  CreateDes() {
    this.isLoading = true;
    this.ai.callAI(this.prompt).subscribe((res) => {
      if (res) {
        this.isLoading = false;
      }
      this.desption = res['candidates'][0]['content']['parts'][0]['text'];
    });
  }

  BntUsing(item: string) {
    this.describe = item;
    this.desption = '';
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
}
