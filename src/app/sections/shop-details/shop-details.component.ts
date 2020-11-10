import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { FetchShopService } from './fetch-shop.service';

@Component({
    templateUrl: 'shop-details.component.html',
    providers: [FetchShopService],
})
export class ShopDetailsComponent {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));
    shopID$ = this.route.params.pipe(pluck('shopID'), shareReplay(1));

    shop$ = this.fetchShopService.shop$;
    inProgress$ = this.fetchShopService.inProgress$;

    constructor(private fetchShopService: FetchShopService, private route: ActivatedRoute) {
        this.route.params.subscribe(({ partyID, shopID }) => {
            this.fetchShopService.getShop(partyID, shopID);
        });
    }
}
