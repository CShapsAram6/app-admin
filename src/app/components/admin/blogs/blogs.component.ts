import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , NavigationEnd, Router } from '@angular/router';
import { debounceTime, forkJoin, Observable, tap } from 'rxjs';
import { blogDto, pageBlogDtos } from '../../../model/blog.model';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { FormControl } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit{

  constructor(private blogsv:BlogService , private route: ActivatedRoute,private router: Router){

  }

  inputControl = new FormControl();
  numberPages: number[] = [];
  blogs: blogDto[] = [];
  isActive: number = 0;
  deleteError: { [key: number]: string } = {};
  popupVisible: { [key: number]: boolean } = {};



  ngOnInit(): void {
      this.LoadPage();
      this.ChangeSearch();
      this.router.events.subscribe((envent) => {
        if (envent instanceof NavigationEnd) {
          this.LoadBlogs(this.inputControl.value || '').subscribe((res) => {
            this.blogs = res.data;
            console.log(this.blogs);
          });
        }
      });
      console.log(this.blogs);
  }


  LoadPage(){
forkJoin([
  this.LoadBlogs(''),
  this.LoadNumberPages(''),
]).subscribe({
  next: (results) => {
    if (results.length > 0) {
      return;
    }
    alert('Error');
    console.log(results);
  },
  error: (err) => {
    console.error(err);
  },
})
  }

  LoadBlogs(name: string) {
    const pagePrameter: number = this.route.snapshot.params['page'];
    this.isActive = pagePrameter;
    let request: pageBlogDtos = {
      page: pagePrameter,
      name: name,
    };
    console.log(request);
    console.log(request + "LoadBlogs");
    return this.blogsv.SearchBlogName(request).pipe(
      tap((resposen: ApiResponse<blogDto[]>) => {
        this.blogs = resposen.data;
        console.log(this.blogs);
      })
    );
  }

  LoadBlogByName(name: string) {
    this.router.navigate(['/admin/blog', 1]);
    let request: pageBlogDtos = {
      page: 1,
      name: name,
    };
    console.log(request);
    console.log(request + "LoadBlogByName");
    return this.blogsv.SearchBlogName(request).pipe(
      tap((resposen: ApiResponse<blogDto[]>) => {
        this.blogs = resposen.data;
        console.log(this.blogs);
      })
    );
  }

  LoadNumberPages(name: string) {
    this.numberPages = [];
    const formData = new FormData();
    formData.append('name', name);
    console.log(formData);
    return this.blogsv
      .countblog(formData)
      .pipe(
        tap((res: ApiResponse<number>) => {
          let lengthPage: number = Math.ceil(res.data / 9);
          for (let i = 1; i <= lengthPage; i++) {
            this.numberPages.push(i);
          }
        })
      );
  }

  ChangeSearch() {
    this.inputControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.LoadPageWhenSearch(value);
      });
  }

    LoadPageWhenSearch(value: string) {
      forkJoin([
        this.LoadBlogByName(value),
        this.LoadNumberPages(value),
      ]).subscribe({
        next: (results) => {
          console.log(results);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }

  showPopup(id: number) {
    this.popupVisible[id] = true;
    }

    closePopup(id: number) {
      this.popupVisible[id] = false;
      this.deleteError[id] = '';
    }
    deleteND(id: number){
      this.blogsv.deleteblog(id).subscribe(
        (data) => {
          console.log(data);
          this.closePopup(id);

        },
        (error) => console.error('Lỗi khi xóa bài viết', error)
      );
    }
}