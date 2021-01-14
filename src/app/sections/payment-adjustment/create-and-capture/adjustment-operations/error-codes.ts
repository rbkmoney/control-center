export enum CreatePaymentAdjustmentErrorCodes {
    InvoicePaymentAdjustmentPending = 'InvoicePaymentAdjustmentPending',
    InvalidPaymentStatus = 'InvalidPaymentStatus',
    InvoicePaymentNotFound = 'InvoicePaymentNotFound',
    InvoiceNotFound = 'InvoiceNotFound',
    InvalidUser = 'InvalidUser',
}

export enum CancelPaymentAdjustmentErrorCodes {
    InvalidUser = 'InvalidUser',
    InvoiceNotFound = 'InvoiceNotFound',
    InvoicePaymentNotFound = 'InvoicePaymentNotFound',
    InvoicePaymentAdjustmentNotFound = 'InvoicePaymentAdjustmentNotFound',
    InvalidPaymentAdjustmentStatus = 'InvalidPaymentAdjustmentStatus',
}

export enum CapturePaymentAdjustmentErrorCodes {
    InvalidUser = 'InvalidUser',
    InvoiceNotFound = 'InvoiceNotFound',
    InvoicePaymentNotFound = 'InvoicePaymentNotFound',
    InvoicePaymentAdjustmentNotFound = 'InvoicePaymentAdjustmentNotFound',
    InvalidPaymentAdjustmentStatus = 'InvalidPaymentAdjustmentStatus',
}
