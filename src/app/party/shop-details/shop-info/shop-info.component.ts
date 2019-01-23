import { Component, Input } from '@angular/core';

import { Shop } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-shop-details',
    templateUrl: 'shop-info.component.html'
})
export class ShopInfo {
    @Input() shop: Shop;
}
