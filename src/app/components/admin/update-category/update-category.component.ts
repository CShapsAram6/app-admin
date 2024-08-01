import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  categoryDtos,
  createcategoryDtos,
} from '../../../model/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent implements OnInit {
  id: any;
  constructor(
    private cate: CategorysService,
    private form: FormBuilder,
    private route: ActivatedRoute,
    private Router: Router,
    private toastr: ToastrService
  ) {}
  images: { url: string; index: number; file: File } = {
    url: '',
    index: 0,
    file: new File([], ''),
  };
  name: string = '';
  isNameTouched: boolean = false;
  isImagetouched: boolean = false;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.GetIdCate();
    console.log(this.images.index);
  }

  GetIdCate() {
    return this.cate.getcateid(this.id).subscribe((res: categoryDtos) => {
      console.log(res);
      (this.name = res.name), (this.images.url = res.images);
      this.images.index = 1;
    });
  }

  updatecate() {
    if (this.name == '' || this.images.index == 0) {
      this.isImagetouched = true;
      this.isNameTouched = true;
      // console.log("hihi");
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('images', this.images.file);
    this.cate.putCate(this.id, formData).subscribe({
      next: (res) => {
        console.log(formData.get('name'));
        this.Router.navigate(['/admin/getcate']);
        this.toastr.success('Sửa danh mục mới thành công');
      },
      error: (err) => {
        console.error('Error updating blog', err);
        this.toastr.error('Sửa danh mục thất bại');
      },
    });
  }

  onFilesSelected(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      const file = files[0]; // Chỉ lấy tệp đầu tiên
      const reader = new FileReader();
      reader.onload = () => {
        this.images = {
          url: reader.result as string,
          index: 1,
          file: file,
        };
        console.log(this.images.index);
      };
      reader.readAsDataURL(file);
    }
  }
  RemoveItem(index: number) {
    console.log(this.images.index);
    if (this.images.index === index) {
      this.images = { url: '', index: 0, file: new File([], '') }; // Xoá hình ảnh
      console.log(this.images.index);
    }
  }
}
