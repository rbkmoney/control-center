import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsAdjustmentsTableComponent } from './payments-adjustments-table.component';

describe('PaymentsAdjustmentsTableComponent', () => {
  let component: PaymentsAdjustmentsTableComponent;
  let fixture: ComponentFixture<PaymentsAdjustmentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsAdjustmentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsAdjustmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
