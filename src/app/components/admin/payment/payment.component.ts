import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { paymentDtos } from '../../../model/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  constructor(private paymentService: PaymentService) {}

  payment: paymentDtos[] = [];
  name: string = '';
  isTitle: boolean = false;
  item!: paymentDtos;

  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    this.paymentService.getData().subscribe((res) => {
      this.payment = res.data;
    });
  }

  Sumbit() {
    let form = new FormData();
    form.append('name', this.name);
    this.paymentService.create(form).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
        this.name = '';
        return;
      }
    });
  }

  OpenPopup(item: paymentDtos) {
    this.name = item.name;
    this.item = item;
  }

  Update(item: paymentDtos) {
    item.name = this.name;
    this.paymentService.update(item).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
        this.name = '';
        return;
      }
    });
  }

  UpdateStatus(id: number) {
    this.paymentService.updateStatus(id).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
        return;
      }
    });
  }
}
