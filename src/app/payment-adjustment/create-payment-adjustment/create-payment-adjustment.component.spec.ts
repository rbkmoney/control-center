import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment.component';

describe('CreatePaymentAdjustmentComponent', () => {
  let component: CreatePaymentAdjustmentComponent;
  let fixture: ComponentFixture<CreatePaymentAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaymentAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
