import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecateComponent } from './createcate.component';

describe('CreatecateComponent', () => {
  let component: CreatecateComponent;
  let fixture: ComponentFixture<CreatecateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatecateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatecateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
