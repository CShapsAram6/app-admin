import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const _routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Trang chủ' },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Quản lý sản phẩm',
      },
    ],
  },
];
@NgModule({
  declarations: [HomeComponent, ProductsComponent],
  imports: [CommonModule, RouterModule.forChild(_routes)],
})
export class AdminModule {}
