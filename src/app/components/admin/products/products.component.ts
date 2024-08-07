import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import {
  pagesDtos,
  productsDtos,
  productsModel,
  variantResponse,
} from '../../../model/products.model';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos } from '../../../model/category.model';
import { debounceTime, forkJoin, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { VariantService } from '../../../services/variant.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private variantService: VariantService,
    private toastrServices: ToastrService
  ) { }
  isShow: boolean = false;
  create: boolean = true;
  isVariant: boolean = false;
  //search input
  inputControl = new FormControl();
  arrCategory: categoryDtos[] = [];
  // variable array products
  products: productsDtos[] = [];
  // quantity and price product by size item
  numberPages: number[] = [];
  isActive: number = 0;
  // loadng page
  isLoading: boolean = false;
  selectedSizeIndices: number[] = [];


  ngOnInit(): void {
    this.LoadPage();
    this.ChangeSearch();
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.LoadProducts(this.inputControl.value || '').subscribe((res) => {
          this.products = res.data;
          this.selectedSizeIndices = this.products.map(() => 0);

        });
      }
    });
  }

  // function search
  ChangeSearch() {
    this.inputControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.LoadPageWhenSearch(value);
      });
  }

  LoadPage() {
    this.isLoading = true;
    forkJoin([
      this.LoadProducts(''),
      this.LoadCategory(),
      this.LoadNumberPages(''),
    ]).subscribe({
      next: (results) => {
        if (results.length > 0) {
          this.isLoading = false;
          return;
        }
        alert('Error');
        console.log(results);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  LoadPageWhenSearch(value: string) {
    this.isLoading = true;
    forkJoin([
      this.LoadProductsByName(value),
      this.LoadNumberPages(value),
    ]).subscribe({
      next: (results) => {
        if (results.length > 0) {
          this.isLoading = false;
          return;
        }
        alert('Error');
        console.log(results);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  LoadProducts(name: string) {
    const pagePrameter: number = this.route.snapshot.params['page'];
    this.isActive = pagePrameter;
    let request: pagesDtos = {
      page: pagePrameter,
      name: name,
    };
    return this.productsSercive.SearchProductsByName(request).pipe(
      tap((resposen: ApiResponse<productsDtos[]>) => {
        this.products = resposen.data;
        this.selectedSizeIndices = this.products.map(() => 0);
      })
    );
  }

  // Load products by name product
  LoadProductsByName(name: string) {
    this.router.navigate(['/admin/products', 1]);
    let request: pagesDtos = {
      page: 1,
      name: name,
    };
    return this.productsSercive.SearchProductsByName(request).pipe(
      tap((resposen: ApiResponse<productsDtos[]>) => {
        this.products = resposen.data;
        this.selectedSizeIndices = this.products.map(() => 0);
      })
    );
  }
  LoadCategory() {
    return this.categoryService.getData().pipe(
      tap((resposen: ApiResponse<categoryDtos[]>) => {
        this.arrCategory = resposen.data;
      })
    );
  }

  LoadNumberPages(name: string) {
    this.numberPages = [];
    return this.productsSercive
      .countLength(productsModel.MapperToFormData(name))
      .pipe(
        tap((res: ApiResponse<number>) => {
          let lengthPage: number = Math.ceil(res.data / 8);
          for (let i = 1; i <= lengthPage; i++) {
            this.numberPages.push(i);
          }
        })
      );
  }
  StringSize(size: number): string {
    switch (size) {
      case 1:
        return 'Lớn';
      case 2:
        return 'Vừa';
      default:
        return 'Nhỏ';
    }
  }

  UpdateStatusVariant(id: number) {
    this.variantService.updateStatusVariant(id).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
        this.toastrServices.success("Cập nhật thành công", "Thông báo")
        return;
      }
      this.toastrServices.error("Cập nhật thành công", "Thông báo")
      console.log(res);
    });
  }
}
