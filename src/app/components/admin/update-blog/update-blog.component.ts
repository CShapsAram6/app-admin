import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.scss'
})
export class UpdateBlogComponent implements OnInit {
  header: string = '';
  content: string = '';
  isLoading: boolean = false;
  imageUrls: { url: string; index: number; file: File, isNew: boolean }[] = [];
  arrImage: { link: string; id: number; isNew: boolean }[] = [];
  ImageDelete: number[] = [];
  IdBlog:number = this.route.snapshot.params['id'];
  tinyConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount media',
  };
  constructor(private blogsv: BlogService, private form: FormBuilder, private route: ActivatedRoute , private Router:Router , private toastr: ToastrService) {}

  ngOnInit(): void {
    forkJoin([this.LoadBlog()]).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  LoadBlog() {
    this.isLoading = true;
    return this.blogsv.GetBlogid(this.IdBlog).pipe(
      tap((res) => {
        this.header = res.data.header;
        this.content = res.data.content;
        this.arrImage = res.data.images ? res.data.images .map((image: any) => ({ ...image, isNew: false })): [];
        this.isLoading = false;
      })
    );
  }

  onFilesSelected(event: any) {
    const input = event.target as HTMLInputElement;

    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (input.files && input.files[0]) {
        const filecheck = input.files[0];
    
        // đoạn if này là để kiểm tra các file đc đẩy lên 
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        if (!allowedTypes.includes(filecheck.type)) {
          this.toastr.error('Chỉ cho phép tải lên file PNG, JPG, JPEG, GIF ');
          return;
        }
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push({
          url: reader.result as string,
          index: this.imageUrls.length,
          file: file,
          isNew: true
        });
      };
      reader.readAsDataURL(file);
    }
  }

    RemoveItem(index: number, isNew: boolean) {
      if (isNew) {
        this.imageUrls = this.imageUrls.filter((item) => item.index !== index);
      } else {
        this.ImageDelete.push(this.arrImage[index].id);
        this.arrImage = this.arrImage.filter((_, i) => i !== index);
      }
    }

  UpdateBlog() {
    this.isLoading = true;

    if(this.header.length <= 0 || this.content.length <= 0 || (this.imageUrls.length <= 0 && this.arrImage.length <= 0) )
    {
      this.isLoading = false;
      return
    }

    const formData = new FormData();
    formData.append('header', this.header);
    formData.append('content', this.content);
    this.ImageDelete.forEach((id, index) => {
      formData.append(`ImageDelete[${index}]`, id.toString());
    });
    for (let i of this.imageUrls) {
      formData.append('images', i.file);
    }
    formData.forEach((value, key) => {
      if (key === 'images') {
        console.log(key + ':', value); // This will log each file
      }
    });

    this.blogsv.updateblog(this.IdBlog,formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('hoàn tất');
        this.Router.navigate(['/admin/blogs/1']);
        this.toastr.success('Sửa bài viết thành công');
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error updating blog', err);
        this.toastr.error('Sửa bài viết thất bại');
      }
    })
  }
}
