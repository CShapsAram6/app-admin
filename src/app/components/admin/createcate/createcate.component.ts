import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../../services/categorys.service';
import { FormBuilder, MinValidator, Validators } from '@angular/forms';
import { createcategoryDtos } from '../../../model/category.model';
import { url } from 'inspector';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-createcate',
  templateUrl: './createcate.component.html',
  styleUrl: './createcate.component.scss'
})
export class CreatecateComponent implements OnInit {
  constructor(private cate:CategorysService ,private form: FormBuilder,private route: ActivatedRoute , private Router:Router ){}
  images: { url: string; index: number; file: File } = { url: "", index: 0, file: new File([], "") };
  name:string = '';
  isNameTouched: boolean = false;
  isImagetouched: boolean = false;
ngOnInit(): void {
  console.log(this.images.index);
}



  createcate() {
    // console.log(this.name + "name")
    // console.log(this.images.index +"img");
    if(this.name == '' || this.images.index == 0){
      this.isImagetouched = true;
      this.isNameTouched = true;
      // console.log("hihi");
      return;      
    }
    // console.log("ngoài");
    const formData = new FormData();
    formData.append('name',this.name);
    formData.append('images' , this.images.file)
    console.log(formData.get('images'));
    console.log(formData.get('name'));
    console.log(this.name)
    this.cate.postCate(formData).subscribe({
      next:(res) => {
        console.log("Sao không vô dc ???");
        this.Router.navigate(['/admin/getcate']);
      },
      error: (err) => {
        console.error('Error updating blog', err);
      }
    })

    }



  onFilesSelected(event: any) {
    const files = event.target.files as FileList;  
    if (files.length > 0) {
      const file = files[0]; // Chỉ lấy tệp đầu tiên
      const reader = new FileReader();
      reader.onload = () => {
        this.images = {
          url: reader.result as string,
          index: 1,
          file: file          
        };
        console.log(this.images.index);
      };
      reader.readAsDataURL(file);
    }
  }
  RemoveItem(index: number) {
    console.log(this.images.index);
    if (this.images.index === index) {
      this.images = { url: "", index: 0, file: new File([], "") }; // Xoá hình ảnh
      console.log(this.images.index);

    }
  }


}
