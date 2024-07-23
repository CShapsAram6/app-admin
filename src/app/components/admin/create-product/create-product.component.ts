import { Component, OnInit } from '@angular/core';
import { AiGenderService } from '../../../services/ai-gender.service';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos, shared, variant } from '../../../model/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import {
  productCreateRequest,
  productsModel,
} from '../../../model/products.model';
import { ProductsService } from '../../../services/products.service';
import { ApiResponse } from '../../../model/ApiResponse.model';
import hljs from 'highlight.js';
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
  color: string = '';
  arrColor: string[] = [];
  arrFile: { index: number; file: File; name: string; type: string }[] = [];
  ngOnInit(): void {
    this.LoadCategory();
  }
  LoadCategory() {
    this.formSize.get('size')!.setValue(this.sizes[0]);

    this.categorysServices
      .getData()
      .subscribe((res: ApiResponse<categoryDtos[]>) => {
        this.categorys = res.data;
        this.category = this.categorys[0].id.toString();
      });
  }
  CreateDes() {
    this.isLoading = true;
    this.ai.callAI(this.prompt).subscribe((res) => {
      if (res) {
        this.isLoading = false;
      }
      this.aiResponse = this.formatResponse(
        res['candidates'][0]['content']['parts'][0]['text']
      );
    });
  }
  formatResponse(response: string): string {
    // Định dạng Markdown cho đoạn mã
    let formatted = response
      .replace(/`([^`]+)`/g, '<code>$1</code>') // Inline code
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
        const language = lang || 'plaintext';
        const highlighted = hljs.highlight(language, code.trim()).value;
        return `<pre><code class="language-${language}">${highlighted}</code></pre>`;
      }) // Code blocks
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Italic
      .replace(/(\d+\.\s)/g, '<br><strong>$1</strong>') // Numbered list
      .replace(/\n/g, '<br>'); // New lines
    return formatted;
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
  onFileSelectedPDF(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < 2; i++) {
      const file = files[i];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.arrFile.push({
            index: i,
            file: file,
            name: file.name,
            type: file.type,
          });
        };
        fileReader.readAsArrayBuffer(file);
      }
    }
    console.log(this.arrFile);
  }

  RemoveFile(index: number) {
    this.arrFile = this.arrFile.splice(index, 1);
  }
  RemoveItem(index: number) {
    this.imageUrls = this.imageUrls.filter((_, i) => i !== index);
  }
  RemoveSize(item: variant) {
    const index = this.listSize.findIndex((a) => item.id === a.id);
    this.listSize = this.listSize.filter((_, i) => i !== index);
  }

  SumbitColor() {
    this.arrColor.push(this.color);
  }

  RemoveColor(item: string) {
    const index = this.arrColor.findIndex((a) => item === a);
    this.arrColor = this.arrColor.filter((_, i) => i !== index);
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
    for (let item of this.arrFile) {
      form.append('model.Files', item.file);
    }
    for (let item of this.arrColor) {
      form.append('model.Colors', item);
    }
    this.productsService
      .create(form)
      .subscribe((res: ApiResponse<productCreateRequest>) => {
        if (res.success) {
          this.isLoadingSumbit = false;
          alert('Thêm thành công');
          return;
        }
        this.isLoadingSumbit = false;
        alert('Có lỗi');
        console.log(res);
      });
  }
}
