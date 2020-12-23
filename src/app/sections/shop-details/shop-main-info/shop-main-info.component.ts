import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Shop } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-shop-main-info',
    templateUrl: 'shop-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopMainInfoComponent {
    @Input()
    shop: Shop;
}
