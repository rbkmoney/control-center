import { Component, Input } from '@angular/core';

import { Shop } from '../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-payment-shop',
    templateUrl: 'payment-shop.component.html',
})
export class PaymentShopComponent {
    @Input()
    shop: Shop;
}
