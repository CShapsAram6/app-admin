import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos } from '../../../model/category.model';
import { error } from 'console';
import { ApiResponse } from '../../../model/ApiResponse.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  constructor(private cate: CategorysService) {}
  ngOnInit(): void {
    this.ListCate();
    
  }
  deleteError: { [key: number]: string } = {};
  popupVisible: { [key: number]: boolean } = {};
  ListCategory: categoryDtos[] = [];
  ListCate() {
    return this.cate
      .getData()
      .subscribe((data: ApiResponse<categoryDtos[]>) => {
        console.log(data);
        this.ListCategory = data.data;
      });
  }

  showPopup(id: number) {
    this.popupVisible[id] = true;
  }

  closePopup(id: number) {
    this.popupVisible[id] = false;
    this.deleteError[id] = '';
  }
  deleteND(id: number) {
    this.cate.catehaspro(id).subscribe(
      (hasPro) => {
        console.log('đã vô dc haspro', hasPro);
        if (hasPro) {
          this.deleteError[id] = 'Danh mục này có sản phẩm không thể xóa.';
          console.log('has??? sao kh in ra???');
        } else {
          this.cate.deletecate(id).subscribe(
            (data) => {
              console.log(data);
              this.ListCate();
              this.closePopup(id);
            },
            (error) => console.error('Lỗi khi xóa danh mục', error)
          );
        }
      },
      (error) => {
        console.log('Lỗi khi check danh mục sản phẩm', error);
      }
    );
  }
}
