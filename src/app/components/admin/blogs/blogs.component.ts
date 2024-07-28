import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { blogDto } from '../../../model/blog.model';
import { ApiResponse } from '../../../model/ApiResponse.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit{
  constructor(private blogsv:BlogService , private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.LoadNumberPages();
    this.route.params.subscribe(params => {
      const page = +params['page'] || 1;
      this.LoadBlog(page);
    });
  }

  numberPages: number[] = [];
  blogs: blogDto[] = [];
  isActive: number = 0;

  LoadBlog(page: number) {
    this.blogsv.getData(page).subscribe(
      (data: ApiResponse<blogDto[]>) => {
        this.blogs = data.data;
        this.isActive = page;
        console.log(page);
        console.log(this.blogs);
        this.LoadNumberPages();
      }
    );
  }

  LoadNumberPages() {
    const formData = new FormData();
    formData.append('name', '');
    console.log(formData);
    this.blogsv.countblog(formData).pipe(
      tap((res: ApiResponse<number>) => {
        let lengthpageblog: number = Math.ceil(res.data / 10);
        console.log(res + " Cái này là res ở loadnumber");
        this.numberPages = [];  // Reset numberPages before pushing new values
        for (let i = 1; i <= lengthpageblog; i++) {
          this.numberPages.push(i);
          console.log(i);
        }
      })
    ).subscribe(); // Ensure subscription
  }




}