import { Component, Input } from '@angular/core';

import { Shop } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-shop-info',
    templateUrl: 'shop-info.component.html'
})
export class ShopInfoComponent {
    @Input() shop: Shop;
    @Input() partyID: string;
}
