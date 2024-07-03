import { Component, OnInit } from '@angular/core';
import { AiGenderService } from '../../../services/ai-gender.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  constructor(private ai: AiGenderService) {}
  list: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  prompt: string = 'Mô tả về cây thông trồng trong nhà ngắn gọn';
  desption: string = '';
  describe: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {}

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
}
