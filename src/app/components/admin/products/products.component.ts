import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productsDtos } from '../../../model/products.model';
import { ApiResponse } from '../../../model/ApiResponse.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(private productsSercive: ProductsService) {}
  isShow: boolean = false;
  create: boolean = true;

  // variable array products
  products: productsDtos[] = [];
  // quantity and price product by size item

  ngOnInit(): void {
    this.LoadProducts();
  }

  LoadProducts() {
    this.productsSercive
      .getData()
      .subscribe((resposen: ApiResponse<productsDtos[]>) => {
        this.products = resposen.data;
      });
  }
}
