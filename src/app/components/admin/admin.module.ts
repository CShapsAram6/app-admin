import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { OrdersComponent } from './orders/orders.component';
import { CancelComponent } from './cancel/cancel.component';
import { ReturnComponent } from './return/return.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { UsersComponent } from './users/users.component';
import { BlogsComponent } from './blogs/blogs.component';
import { LoadingComponent } from './loading/loading.component';
import { VariantComponent } from './variant/variant.component';
import { PaymentComponent } from './payment/payment.component';
import { CategoryComponent } from './category/category.component';
import { CreatecateComponent } from './createcate/createcate.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CreateVoucherDialogComponent } from './vouchers/create-voucher-dialog/create-voucher-dialog.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { AdminComponent } from './admin.component';
import {
  EditorComponent,
  EditorModule,
  TINYMCE_SCRIPT_SRC,
} from '@tinymce/tinymce-angular';
import { UpdateVoucherComponent } from './vouchers/update-voucher/update-voucher.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';

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
            path: 'variant/:id',
            component: VariantComponent,
            title: 'Quản lý kích thước',
          },
        ],
      },
      {
        path: 'update-products/:id',
        component: UpdateProductsComponent,
        title: 'Cập nhật sản phẩm',
      },
      {
        path: 'product-create',
        component: CreateProductComponent,
        title: 'Thêm sản phẩm mới ',
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
        path: 'postcate',
        component: CreatecateComponent,
        title: 'Tạo danh mục',
      },
      {
        path: 'getcate',
        component: CategoryComponent,
        title: ' danh mục',
      },
      {
        path: 'putcate/:id',
        component: UpdateCategoryComponent,
        title: 'Sửa danh mục',
      },
      {
        path: 'blogs/:page',
        component: BlogsComponent,
        children:[
          {path:':page',component:BlogsComponent,title:'Bài Viết'}
        ]
      },
      {
        path:'createblog',
        component:CreateBlogComponent,
        title:'Thêm bài viết'
      },
      {
        path:'updateblog/:id',
        component:UpdateBlogComponent,
        title:'Sửa bài viết'
      },
      {
        path:'updatevoucher/:id',
        component:UpdateVoucherComponent,
        title:'Sửa voucher'
      }

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
    CreatecateComponent,
    CategoryComponent,
    UpdateCategoryComponent,
    CreateVoucherDialogComponent,
    CreateBlogComponent,
    UpdateBlogComponent,
    UpdateVoucherComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(_routes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    EditorComponent,    
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
})
export class AdminModule {}
