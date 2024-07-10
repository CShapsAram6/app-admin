import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productsDtos, variantResponse } from '../../../model/products.model';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos } from '../../../model/category.model';
import { forkJoin, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsSercive: ProductsService,
    private categoryService: CategorysService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isShow: boolean = false;
  create: boolean = true;
  isVariant: boolean = false;

  arrCategory: categoryDtos[] = [];
  // variable array products
  products: productsDtos[] = [];
  // quantity and price product by size item
  numberPages: number[] = [];

  isActive: number = 0;

  ngOnInit(): void {
    this.LoadPage();
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.LoadPage();
      }
    });
  }

  LoadPage() {
    forkJoin([
      this.LoadProducts(),
      this.LoadCategory(),
      this.LoadNumberPages(),
    ]).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  LoadProducts() {
    const pagePrameter: number = this.route.snapshot.params['page'];
    this.isActive = pagePrameter;
    return this.productsSercive.getData(pagePrameter).pipe(
      tap((resposen: ApiResponse<productsDtos[]>) => {
        this.products = resposen.data;
      })
    );
  }
  LoadCategory() {
    return this.categoryService.getData().pipe(
      tap((resposen: categoryDtos[]) => {
        this.arrCategory = resposen;
      })
    );
  }

  LoadNumberPages() {
    this.numberPages = [];
    return this.productsSercive.countLength().pipe(
      tap((res: ApiResponse<number>) => {
        let lengthPage: number = Math.ceil(res.data / 2);
        for (let i = 1; i <= lengthPage; i++) {
          this.numberPages.push(i);
        }
      })
    );
  }

  ChangeVariantItem(item: variantResponse) {
    console.log(item);
  }
}
