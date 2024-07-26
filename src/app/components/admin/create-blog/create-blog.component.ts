import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { createblog } from '../../../model/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private Blogsv: BlogService,
    private Router: Router
  ) {}

  imageUrls: { url: string; index: number; file: File }[] = [];
  isLoadingSumbit: boolean = false;
  createBlogForm = this.form.group({
    header: ['', Validators.required],
    content: ['', Validators.required],
    images: [null],
  });

  ngOnInit(): void {
    // up load git
  }

  //lấy thông tin hình ảnh
  onFilesSelected(event: any) {
    this.imageUrls = [];
    const files = (FileList = event.target.files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push({
          url: reader.result as string,
          index: i,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  RemoveItem(index: number) {
    this.imageUrls = this.imageUrls.filter((_, i) => i !== index);
  }

  CreateBlog() {
    console.log(this.imageUrls);
    if (this.createBlogForm.invalid || this.imageUrls.length < 0) {
      this.createBlogForm.markAllAsTouched();
      return;
    }
    this.isLoadingSumbit = true;
    const formData: FormData = new FormData();
    formData.append('header', this.createBlogForm.get('header')?.value || '');
    formData.append('content', this.createBlogForm.get('content')?.value || '');

    for (let i of this.imageUrls) {
      formData.append('images', i.file);
    }
    formData.forEach((value, key) => {
      if (key === 'images') {
        console.log(key + ':', value); // This will log each file
      }
    });

    this.Blogsv.createblog(formData).subscribe(
      (response: ApiResponse<createblog>) => {
        this.isLoadingSumbit = false;
        if (response.success) {
          alert('Blog created successfully');
          // handle success scenario, maybe reset the form
          this.createBlogForm.reset();
          this.imageUrls = [];
          this.Router.navigate(['/admin/blogs/1']);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        this.isLoadingSumbit = false;
        console.error('Error creating blog', error);
        alert('Error creating blog');
      }
    );
  }
}
