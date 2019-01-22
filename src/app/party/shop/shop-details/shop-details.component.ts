import { Component, Input } from '@angular/core';

import { Shop } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-shop-details',
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent {
    @Input() shop: Shop;
}
