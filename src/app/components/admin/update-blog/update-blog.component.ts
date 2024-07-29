import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import { Router } from '@angular/router';


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
  constructor(private blogsv: BlogService, private form: FormBuilder, private route: ActivatedRoute , private Router:Router) {}

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
    return this.blogsv.GetBlogid(this.IdBlog).pipe(
      tap((res) => {
        this.header = res.data.header;
        this.content = res.data.content;
        this.arrImage = res.data.images ? res.data.images .map((image: any) => ({ ...image, isNew: false })): [];
      })
    );
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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

    if(this.header.length <= 0 || this.content.length <= 0 || (this.imageUrls.length <= 0 && this.arrImage.length <= 0) )
    {
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
        console.log(formData.get('header'));
        this.Router.navigate(['/admin/blogs/1']);

      },
      error: (err) => {
        console.error('Error updating blog', err);
      }
    })
  }
}