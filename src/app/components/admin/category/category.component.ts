import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos } from '../../../model/category.model';
import { error } from 'console';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { debounceTime, tap } from 'rxjs';
import { response } from 'express';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  constructor(private cate: CategorysService, private route: ActivatedRoute,private router: Router) {}

  inputControl = new FormControl();
  deleteError: { [key: number]: string } = {};
  popupVisible: { [key: number]: boolean } = {};
  ListCategory: categoryDtos[] = [];
  ngOnInit(): void {
    this.ListCate();
    this.ChangeSearch();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ListCateByName(this.inputControl.value || '').subscribe((res) => {
          this.ListCategory = res.data;
        });
      }
    });
  }

  ListCate() {
    return this.cate.getData().subscribe((data: ApiResponse<categoryDtos[]>) => {
      console.log(data);
      this.ListCategory = data.data;
    });
  }

  ListCateByName(name: string) {
    console.log(name);
    return this.cate.SearchCateByName(name).pipe(
      tap((response: ApiResponse<categoryDtos[]>) => {
        this.ListCategory = response.data;
        console.log(this.ListCategory);
      })
    );
  }

  ChangeSearch() {
    this.inputControl.valueChanges.pipe(
      debounceTime(400)
    ).subscribe((value) => {
      console.log(value);
      this.cate.SearchCateByName(value).subscribe((response: ApiResponse<categoryDtos[]>) => {
        this.ListCategory = response.data;
        console.log(value);
      },(error) => {
        console.log(error);
      })
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
