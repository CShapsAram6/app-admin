import { Component, OnInit } from '@angular/core';
import { voucherDto } from '../../../model/voucher.model';
import { VoucherService } from '../../../services/voucher.service';
import { ApiResponse } from '../../../model/ApiResponse.model';
import { CreateVoucherDialogComponent } from './create-voucher-dialog/create-voucher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { title } from 'process';


@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss'
})
export class VouchersComponent implements OnInit {
  constructor (private voucher:VoucherService, private dialog:MatDialog){}

  openDialog(): void {
   const dialogRef = this.dialog.open(CreateVoucherDialogComponent,{
      height: '400px',
      width: '60%',
      data:{
        title: 'Thêm Voucher'
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('close');
      console.log(result);
    })
    
  }

  ngOnInit(): void { 
    this.GetListVoucher();
  }
  ListVoucher: voucherDto[]=[];
  GetListVoucher(){
    return this.voucher.getData().subscribe((data:ApiResponse<voucherDto[]>)=>{
      console.log(data);
     this.ListVoucher = data.data;
    })
  }
  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Đang diễn ra';
      case 0:
        return 'Sắp diễn ra';
      case 2:
        return 'Đã kết thúc';
      default:
        return 'Không xác định';
    }
  }
}
