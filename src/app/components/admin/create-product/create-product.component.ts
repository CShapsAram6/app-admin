import { Component, OnInit } from '@angular/core';
import { AiGenderService } from '../../../services/ai-gender.service';
import { CategorysService } from '../../../services/categorys.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  constructor(
    private ai: AiGenderService,
    private categorysServices: CategorysService
  ) {}
  list: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  prompt: string = 'Mô tả về cây thông trồng trong nhà ngắn gọn';
  desption: string = '';
  describe: string = '';
  isLoading: boolean = false;
  imageUrls: { url: string; index: number; file: File }[] = [];
  ngOnInit(): void {
    this.categorysServices.getData().subscribe((res) => {
      console.log(res);
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
}
