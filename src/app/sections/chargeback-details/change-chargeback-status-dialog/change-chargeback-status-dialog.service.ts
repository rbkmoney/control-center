import { Injectable } from '@angular/core';

import { PaymentProcessingService } from '../../../thrift-services/damsel/payment-processing.service';

export const Statuses = ['Accept', 'Cancell', 'Reject'] as const;

@Injectable()
export class ChangeChargebackStatusDialogService {
    constructor(private paymentProcessingService: PaymentProcessingService) {}

    changeStatus({
        status,
        date,
        invoiceID,
        paymentID,
        chargebackID,
    }: {
        status: string;
        date: string;
        invoiceID: string;
        paymentID: string;
        chargebackID: string;
    }) {
        const fnByStatus = {
            Accept: this.paymentProcessingService.acceptChargeback,
            Cancell: this.paymentProcessingService.cancelChargeback,
            Reject: this.paymentProcessingService.rejectChargeback,
        };
        return fnByStatus[status as typeof Statuses[number]].bind(this.paymentProcessingService)(
            invoiceID,
            paymentID,
            chargebackID,
            Object.assign({}, !!date && { occurred_at: date })
        );
    }
}
