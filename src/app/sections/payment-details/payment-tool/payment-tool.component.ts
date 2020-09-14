import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentTool } from '../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-payment-tool',
    templateUrl: 'payment-tool.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentToolComponent {
    @Input() paymentTool: PaymentTool;
}
