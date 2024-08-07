import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { GetUserId } from '../../../model/account.model';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { flush } from '@angular/core/testing';
import { error } from 'console';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent implements OnInit {
  isLoading:boolean = false;
  IdUser:number = this.route.snapshot.params['id'];
  tinyConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount media',
  };
  getuserid: GetUserId | undefined;

  constructor(private usersv:UserService,  private form: FormBuilder, private route: ActivatedRoute , private Router:Router , private toastr: ToastrService){}
  ngOnInit(): void {
    this.LoadUserId();
  }


  LoadUserId() {
    this.isLoading = true;
    this.usersv.GetUserId(this.IdUser).subscribe((res:ApiResponse<GetUserId>) =>{
      this.getuserid = res.data;
      console.log(this.getuserid);
      this.isLoading = false;
    },
  (error) => {
    console.log(error);
    this.isLoading = false;
  });
  }
}
