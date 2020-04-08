import { Component, Input } from '@angular/core';

import { Shop } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-shop-info',
    templateUrl: 'shop-info.component.html',
})
export class ShopInfoComponent {
    @Input() shop: Shop;
    @Input() partyID: string;
}
