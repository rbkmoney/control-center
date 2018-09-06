import { TestBed, inject } from '@angular/core/testing';

import { CreatePaymentAdjustmentService } from './create-payment-adjustment.service';

describe('CreatePaymentAdjustmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePaymentAdjustmentService]
    });
  });

  it('should be created', inject([CreatePaymentAdjustmentService], (service: CreatePaymentAdjustmentService) => {
    expect(service).toBeTruthy();
  }));
});
