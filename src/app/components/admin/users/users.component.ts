import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, forkJoin, tap } from 'rxjs';
import { pagesDtos } from '../../../model/products.model';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { QLUser } from '../../../model/account.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private usersv:UserService  , private route: ActivatedRoute,private router: Router){}

  inputControl = new FormControl();
  numberPages: number[] = [];
  users: QLUser[] = [];
  isActive: number = 0;
  deleteError: { [key: number]: string } = {};
  popupVisible: { [key: number]: boolean } = {};
  isLoading: boolean = false;


  ngOnInit(): void {
    this.LoadPage();
    this.ChangeSearch();
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.LoadUsers(this.inputControl.value || '').subscribe((res) => {
          this.users = res.data;
        });
      }
    });
  }

  LoadPage(){
    forkJoin([
      this.LoadUsers(''),
      this.LoadNumberPages(''),
    ]).subscribe({
      next:(results) => {
        if(results.length > 0){
          return;
        }
        alert('error');
        console.log(results);        
      },
      error:(err) => {
        console.error(err);
      }
    })
  }


  LoadUsers(name:string){
    this.isLoading = true;
    const pagePrameter:number = this.route.snapshot.params['page'];
    this.isActive = pagePrameter;
    let request:pagesDtos = {
      page:pagePrameter,
      name:name,
    }
    console.log(request);
    return this.usersv.SearchUser(request).pipe(
      tap((resposen: ApiResponse<QLUser[]>) => {
        this.users = resposen.data
        console.log(this.users);
        this.isLoading = false;
      })
    )
  }

  LoadNumberPages(name:string){
    this.numberPages = [];
    const formData = new FormData();
    formData.append('name',name);
    return this.usersv.countUser(formData).pipe(
      tap((res:ApiResponse<number>) =>{
        let lengthPage:number = Math.ceil(res.data / 8);
        for(let i = 1 ; i <= lengthPage; i++){
          this.numberPages.push(i);
        }
      })
    )
  }

  ChangeSearch(){
    this.inputControl.valueChanges
    .pipe(debounceTime(400)).subscribe((value) => {
      this.LoadPageWhenSearch(value);
    });
  }

  LoadPageWhenSearch(value: string) {
    forkJoin([
      this.LoadUsersName(value),
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

  LoadUsersName(name: string) {
    this.router.navigate(['/admin/User', 1]);
    let request: pagesDtos = {
      page: 1,
      name: name,
    };
    console.log(request);
    console.log(request + "LoadBlogByName");
    return this.usersv.SearchUser(request).pipe(
      tap((resposen: ApiResponse<QLUser[]>) => {
        this.users = resposen.data;
      })
    );
  }

  //update status user

  updateStatus(id: number, event: any) {
    const status = event.target.checked;
    this.usersv.UpdateStatus(id, status).subscribe(response => {
      if (response.success) {
        console.log('Cập nhật thành công');
      } else {
        console.error('Cập nhật thất bại');
      }
    });
  }
}

