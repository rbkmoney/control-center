import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
    FailureCode,
    FailureReason,
    InvoicePaymentStatus,
    SubFailure,
} from '../../../../thrift-services/damsel/gen-model/domain';

export interface PaymentError {
    code: FailureCode;
    reason: FailureReason;
    path: string;
}

@Component({
    selector: 'cc-payment-error',
    templateUrl: 'payment-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentErrorComponent {
    @Input()
    set status(status: InvoicePaymentStatus) {
        const {
            failed: {
                failure: {
                    failure: { code, reason, sub },
                },
            },
        } = status;
        this.error = {
            code,
            reason,
            path: this.makePath(sub),
        };
    }

    error: PaymentError;

    private makePath(sub: SubFailure): string {
        const path = [];
        if (sub) {
            path.push(sub.code);
            if (sub.sub) {
                path.push(this.makePath(sub.sub));
            }
        }
        return path.join(' → ');
    }
}
