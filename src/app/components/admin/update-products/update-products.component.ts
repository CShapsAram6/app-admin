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
  imageDtos,
  productsUpdateDtos,
  colorDtos,
  filesDtos,
} from '../../../model/products.model';
import { CategorysService } from '../../../services/categorys.service';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import hljs from 'highlight.js';
import { ColorsService } from '../../../services/colors.service';
import { VariantService } from '../../../services/variant.service';

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
    private route: ActivatedRoute,
    private colorsServices: ColorsService,
    private variantServices: VariantService
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

  color: string = '';
  arrColor: string[] = [];
  arrFile: { index: number; file: File; name: string; type: string }[] = [];

  arrColorRes: colorDtos[] = [];
  arrFilesRes: filesDtos[] = [];
  idProducts: number = this.route.snapshot.params['id'];
  pdfSrc: string =
    'https://drive.google.com/file/d/1EuWMdtLzHbH3pMHjd181oxP5g3ZRHF4n/view';

  tinyConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount media',
  };

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
  openFile(link: string) {
    console.log(link);
    this.pdfSrc = `https://drive.google.com/file/d/${link}/view`;
    console.log(this.pdfSrc);
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
        this.arrColorRes = res.data.colors;
        this.arrFilesRes = res.data.files;
      })
    );
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
  RemoveSize(id: number) {
    this.variantServices.DeleteVariant(id).subscribe((res) => {
      if (res.success) {
        this.ngOnInit();
      }
    });
  }

  OnSumbit() {
    let data: variant = this.formSize.value as variant;
    data.id = this.idProducts.toString();
    this.variantServices.createVariant(data).subscribe((res) => {
      if (res.success) {
        this.ngOnInit();
        this.formSize.reset();
      }
    });
  }

  RemoveColor(id: number) {
    this.colorsServices.Delete(id).subscribe((res) => {
      if (res.success) {
        this.ngOnInit();
      }
    });
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
    for (let item of this.arrFile) {
      form.append('model.Files', item.file);
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
          this.arrFile = [];
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
    // this.productsService.updateVariant(vartiant).subscribe((response) => {
    //   if (response.success) {
    //     this.isButtonUpdate = false;
    //     this.ngOnInit();
    //     this.resetForm();
    //     return;
    //   }
    // });
  }

  CreateColor() {
    let request: colorDtos = {
      id: this.idProducts,
      code: this.color,
    };
    this.colorsServices.create(request).subscribe((res) => {
      console.log(res);

      if (res.success) {
        this.ngOnInit();
        this.color = '';
        return;
      }
    });
  }

  // reset
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
