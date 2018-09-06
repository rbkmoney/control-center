import { TestBed, inject } from '@angular/core/testing';

import { PaymentAdjustmentService } from './payment-adjustment.service';

describe('PaymentAdjustmentService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaymentAdjustmentService]
        });
    });

    it('should be created', inject([PaymentAdjustmentService], (service: PaymentAdjustmentService) => {
        expect(service).toBeTruthy();
    }));
});
