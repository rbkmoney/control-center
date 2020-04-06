import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopInfo } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-shop-info',
    templateUrl: 'shop-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopInfoComponent {
    @Input() shopInfo: ShopInfo;
}
