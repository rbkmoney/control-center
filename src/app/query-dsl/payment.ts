import {
    InvoicePaymentFlow,
    InvoicePaymentStatus,
    PaymentTool,
    TerminalPaymentProvider
} from '../thrift-services/damsel/gen-model/merch_stat';

export interface Payment {
    payment_id?: string;
    invoice_id?: string;
    payment_email?: string;
    payment_flow?: InvoicePaymentFlow;
    payment_method?: PaymentTool;
    payment_terminal_provider?: TerminalPaymentProvider;
    payment_ip?: string;
    payment_fingerprint?: string;
    payment_pan_mask?: string;
    payment_customer_id?: string;
    payment_amount?: string;
    payment_status?: InvoicePaymentStatus;
    payment_domain_revision?: string;
}
