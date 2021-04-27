import {
    InvoicePaymentChargebackCategory,
    InvoicePaymentChargebackStage,
    InvoicePaymentChargebackStatus,
} from '../thrift-services/damsel/gen-model/domain';

export const CHARGEBACK_STATUSES: (keyof InvoicePaymentChargebackStatus)[] = [
    'accepted',
    'cancelled',
    'pending',
    'rejected',
];

export const CHARGEBACK_CATEGORIES: (keyof InvoicePaymentChargebackCategory)[] = [
    'authorisation',
    'dispute',
    'fraud',
    'processing_error',
];

export const CHARGEBACK_STAGES: (keyof InvoicePaymentChargebackStage)[] = [
    'arbitration',
    'chargeback',
    'pre_arbitration',
];

// https://github.com/rbkmoney/magista#chargebacks
export interface Chargebacks {
    merchant_id?: string;
    shop_ids?: string;
    invoice_id?: string;
    payment_id?: string;
    chargeback_id?: string;
    from_time?: string;
    to_time?: string;
    // список интересующих статусов
    chargeback_statuses?: (keyof InvoicePaymentChargebackStatus)[];
    // список интересующих категорий
    chargeback_categories?: (keyof InvoicePaymentChargebackCategory)[];
    // список интересующих этапов
    chargeback_stages?: (keyof InvoicePaymentChargebackStage)[];
}
