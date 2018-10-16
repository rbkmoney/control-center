import { PaymentAdjustmentCreationParams } from './adjustment-params';

export interface PaymentAdjustmentCreationScope {
    adjustmentId?: string;
    creationParams: PaymentAdjustmentCreationParams;
}
