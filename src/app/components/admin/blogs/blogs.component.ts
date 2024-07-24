import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { blogDto } from '../../../model/blog.model';
import { ApiResponse } from '../../../model/ApiResponse.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit{
  constructor(private blog:BlogService , private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      const page = +params['page'] || 1;
      this.LoadBlog(page);
    });
    this.blogs;
  }

  numberPages: number[] = [];
  blogs: blogDto[] = [];
  isActive: number = 0;
  // loadng page
  LoadBlog(page:number){
    this.blog.getData(page).subscribe(
      (data: ApiResponse<blogDto[]>) => {this.blogs = data.data;
      this.isActive = page;
      console.log(this.blogs);
    }
    )
  }


}
