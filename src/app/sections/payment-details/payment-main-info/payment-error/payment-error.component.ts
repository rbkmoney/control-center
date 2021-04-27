import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getUnionKey } from '@cc/utils/get-union-key';

import {
    FailureCode,
    FailureReason,
    InvoicePaymentStatus,
    SubFailure,
} from '../../../../thrift-services/damsel/gen-model/domain';

export interface PaymentError {
    code: FailureCode;
    reason?: FailureReason;
    path?: string;
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
            failed: { failure },
        } = status;

        switch (getUnionKey(failure)) {
            case 'failure':
                const { code, reason, sub } = failure.failure;
                this.error = {
                    code,
                    reason,
                    path: this.makePath(sub),
                };
                break;
            case 'operation_timeout':
                this.error = {
                    code: 'operation_timeout',
                };
                break;
        }
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
