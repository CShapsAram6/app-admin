import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoucherDialogComponent } from './create-voucher-dialog.component';

describe('CreateVoucherDialogComponent', () => {
  let component: CreateVoucherDialogComponent;
  let fixture: ComponentFixture<CreateVoucherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateVoucherDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVoucherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
