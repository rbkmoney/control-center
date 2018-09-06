import { PaymentAdjustmentModule } from './payment-adjustment.module';

describe('PaymentAdjustmentModule', () => {
  let paymentAdjustmentModule: PaymentAdjustmentModule;

  beforeEach(() => {
    paymentAdjustmentModule = new PaymentAdjustmentModule();
  });

  it('should create an instance', () => {
    expect(paymentAdjustmentModule).toBeTruthy();
  });
});
