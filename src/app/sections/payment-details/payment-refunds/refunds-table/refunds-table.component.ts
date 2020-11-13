import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Refund } from '../../../../query-dsl/refund';
import { InvoicePaymentRefundStatus } from '../../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-refunds-table',
    templateUrl: 'refunds-table.component.html',
    styleUrls: ['refunds-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsTableComponent {
    @Input() refunds: Refund[];

    mapStatus: { [N in keyof InvoicePaymentRefundStatus] } = {
        pending: 'Pending',
        succeeded: 'Succeeded',
        failed: 'Failed',
    };
    displayedColumns = ['createdAt', 'status', 'amount', 'reason'];
}
