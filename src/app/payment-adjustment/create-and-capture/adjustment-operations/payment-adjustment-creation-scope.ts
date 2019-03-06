import { PaymentAdjustmentCreationParams } from './adjustment-params';

export interface PaymentAdjustmentCreationScope {
    adjustment_id?: string;
    creation_params: PaymentAdjustmentCreationParams;
}
