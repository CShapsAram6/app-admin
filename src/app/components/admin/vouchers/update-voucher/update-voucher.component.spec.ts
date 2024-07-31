import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVoucherComponent } from './update-voucher.component';

describe('UpdateVoucherComponent', () => {
  let component: UpdateVoucherComponent;
  let fixture: ComponentFixture<UpdateVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
