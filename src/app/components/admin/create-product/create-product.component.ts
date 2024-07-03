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
  prompt: string = '';
  ngOnInit(): void {}

  CreateDes() {
    console.log(this.prompt);
    this.ai.callAI(this.prompt).subscribe((res) => {
      const newResponse = res['candidates'][0]['content']['parts'][0]['text'];
      console.log(newResponse);
    });
  }
}
