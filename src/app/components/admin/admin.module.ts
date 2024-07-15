import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { OrdersComponent } from './orders/orders.component';
import { CancelComponent } from './cancel/cancel.component';
import { ReturnComponent } from './return/return.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { UsersComponent } from './users/users.component';
import { BlogsComponent } from './blogs/blogs.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { LoadingComponent } from './loading/loading.component';
import { VariantComponent } from './variant/variant.component';
import { PaymentComponent } from './payment/payment.component';
const _routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Trang chủ' },
      {
        path: 'products/:page',
        component: ProductsComponent,
        title: 'Quản lý sản phẩm',
        children: [
          {
            path: ':id',
            component: UpdateProductsComponent,
            title: 'Cập nhật sản phẩm',
          },
          {
            path: 'variant/:id',
            component: VariantComponent,
            title: 'Quản lý kích thước',
          },
        ],
      },
      { path: 'order', component: OrdersComponent, title: 'Quản lý đơn hàng' },
      {
        path: 'cancel',
        component: CancelComponent,
        title: 'Quản lý yêu cầu hủy',
      },
      {
        path: 'return',
        component: ReturnComponent,
        title: 'Quản lý yêu cầu hủy',
      },
      {
        path: 'payment',
        component: PaymentComponent,
        title: 'Phương thúc thanh toán',
      },
      {
        path: 'vouchers',
        component: VouchersComponent,
        title: 'Quản lý vouchers',
      },
      {
        path: 'users',
        component: UsersComponent,
        title: 'Quản lý người dùng',
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        title: 'Quản lý bài viết',
      },
    ],
  },
];
@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    CreateProductComponent,
    UpdateProductsComponent,
    OrdersComponent,
    CancelComponent,
    ReturnComponent,
    VouchersComponent,
    UsersComponent,
    BlogsComponent,
    LoadingComponent,
    VariantComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(_routes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
  ],
})
export class AdminModule {}
