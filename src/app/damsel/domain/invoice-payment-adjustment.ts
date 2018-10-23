import { InvoicePaymentAdjustmentStatus } from './invoice-payment-adjustment-status';
import { FinalCashFlowPosting } from './final-cash-flow-posting';

export interface InvoicePaymentAdjustment {
    id: string;
    status: InvoicePaymentAdjustmentStatus;
    createdAt: string;
    domainRevision: number;
    reason: string;
    newCashFlow: FinalCashFlowPosting[];
    oldCashFlowInverse: FinalCashFlowPosting[];
}
