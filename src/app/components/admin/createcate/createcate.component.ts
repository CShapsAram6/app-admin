import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { FormBuilder, MinValidator, Validators } from '@angular/forms';
import { createcategoryDtos } from '../../../model/category.model';

@Component({
  selector: 'app-createcate',
  templateUrl: './createcate.component.html',
  styleUrl: './createcate.component.scss'
})
export class CreatecateComponent implements OnInit {
  constructor(private cate:CategorysService ,private form:FormBuilder, ){}
ngOnInit(): void {
  this.formcate;
}

formcate = this.form.group({ 
 name:['',[Validators.required, Validators.maxLength(30),Validators.minLength(5)]]
});

createcate() {
  if(this.formcate.invalid){
    this.formcate.markAllAsTouched();
    return;
  }
  if(this.formcate.valid){
    let request:createcategoryDtos = this.formcate.value as createcategoryDtos
    this.cate.postCate(request).subscribe(
      (da) => {
        console.log(da);
      }
    )
  }
}
}
