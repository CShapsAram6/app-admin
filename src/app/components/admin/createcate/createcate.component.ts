import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { FormBuilder, MinValidator, Validators } from '@angular/forms';
import { createcategoryDtos } from '../../../model/category.model';
import { url } from 'inspector';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createcate',
  templateUrl: './createcate.component.html',
  styleUrl: './createcate.component.scss'
})
export class CreatecateComponent implements OnInit {
  constructor(private cate: CategorysService, private form: FormBuilder, private route: ActivatedRoute, private Router: Router, private toastr: ToastrService) { }
  images: { url: string; index: number; file: File } = { url: "", index: 0, file: new File([], "") };
  name: string = '';
  isNameTouched: boolean = false;
  isImagetouched: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    console.log(this.images.index);
  }



  createcate() {
    this.isLoading = true;
    // console.log(this.name + "name")
    // console.log(this.images.index +"img");
    if (this.name == '' || this.images.index == 0) {
      this.isImagetouched = true;
      this.isNameTouched = true;
      this.isLoading = false;

      // console.log("hihi");
      return;
    }
    // console.log("ngoài");
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('images', this.images.file)
    console.log(formData.get('images'));
    console.log(formData.get('name'));
    console.log(this.name)
    this.cate.postCate(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log("Sao không vô dc ???");
        this.Router.navigate(['/admin/getcate']);
        this.toastr.success('Tạo danh mục mới thành công');

      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error updating blog', err);
        this.toastr.error('Tạo danh mục thât bại');

      }
    })

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
          file: file
        };
        console.log(this.images.index);
      };
      reader.readAsDataURL(file);
    }
  }
  RemoveItem(index: number) {
    console.log(this.images.index);
    if (this.images.index === index) {
      this.images = { url: "", index: 0, file: new File([], "") }; // Xoá hình ảnh
      console.log(this.images.index);

    }
  }


}
