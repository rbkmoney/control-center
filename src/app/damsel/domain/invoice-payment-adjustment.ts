import { InvoicePaymentAdjustmentStatus } from './invoice-payment-adjustment-status';
import { FinalCashFlowPosting } from './final-cash-flow-posting';

export interface InvoicePaymentAdjustment {
    id: string;
    status: InvoicePaymentAdjustmentStatus;
    created_at: string;
    domain_revision: number;
    reason: string;
    new_cash_flow: FinalCashFlowPosting[];
    old_cash_flow_inverse: FinalCashFlowPosting[];
}
