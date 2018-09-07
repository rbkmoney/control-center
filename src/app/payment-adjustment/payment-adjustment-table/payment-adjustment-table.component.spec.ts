import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAdjustmentTableComponent } from './payment-adjustment-table.component';

describe('PaymentAdjustmentTableComponent', () => {
  let component: PaymentAdjustmentTableComponent;
  let fixture: ComponentFixture<PaymentAdjustmentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAdjustmentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAdjustmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
