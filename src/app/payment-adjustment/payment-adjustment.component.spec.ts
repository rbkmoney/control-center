import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAdjustmentComponent } from './payment-adjustment.component';

describe('PaymentAdjustmentComponent', () => {
  let component: PaymentAdjustmentComponent;
  let fixture: ComponentFixture<PaymentAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
