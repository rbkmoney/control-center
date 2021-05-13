import { Injectable } from '@angular/core';

import { PaymentProcessingService } from '../../../thrift-services/damsel/payment-processing.service';

export const STATUSES = ['Accept', 'Cancell', 'Reject'] as const;

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
            /* eslint-disable @typescript-eslint/naming-convention */
            Accept: this.paymentProcessingService.acceptChargeback,
            Cancell: this.paymentProcessingService.cancelChargeback,
            Reject: this.paymentProcessingService.rejectChargeback,
            /* eslint-enable @typescript-eslint/naming-convention */
        };
        return fnByStatus[status as typeof STATUSES[number]].bind(this.paymentProcessingService)(
            invoiceID,
            paymentID,
            chargebackID,
            Object.assign({}, !!date && { occurred_at: date })
        );
    }
}
