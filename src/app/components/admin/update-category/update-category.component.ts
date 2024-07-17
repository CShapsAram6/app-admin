import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { categoryDtos, createcategoryDtos } from '../../../model/category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {
  id: any;
  constructor(private cate:CategorysService,private routes:ActivatedRoute, private form:FormBuilder){}
  ngOnInit(): void {
    this.id = Number(this.routes.snapshot.paramMap.get('id'));
    this.GetIdCate();
    this.formupdatecate;
  }

  formupdatecate = this.form.group({ 
    name:['',[Validators.required, Validators.maxLength(30),Validators.minLength(5)]]
   });

   GetIdCate(){
    return this.cate.getcateid(this.id).subscribe(
      (res:categoryDtos) =>{
        console.log(res)
        this.formupdatecate.setValue({
          name:res.name
        })
      }
    )
   }

    editcate(){
      if(this.formupdatecate.invalid){
        this.formupdatecate.markAllAsTouched();
        return;
      }
      if(this.formupdatecate.valid){
        let request:createcategoryDtos = this.formupdatecate.value as unknown as createcategoryDtos
        this.cate.putCate(this.id,request).subscribe(
          (res) => {console.log(res)}
        )
      }
    }





}
