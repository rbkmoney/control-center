import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Shop } from '../../../thrift-services/damsel/gen-model/domain';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-payment-main-info',
    templateUrl: 'payment-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMainInfoComponent {
    @Input() payment: StatPayment;
    @Input() shop: Shop;
}
