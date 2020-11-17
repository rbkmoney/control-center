import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FetchShopService } from './fetch-shop.service';

@Component({
    templateUrl: 'shop-details.component.html',
    providers: [FetchShopService],
})
export class ShopDetailsComponent {
    shop$ = this.fetchShopService.shop$;
    inProgress$ = this.fetchShopService.inProgress$;

    constructor(private fetchShopService: FetchShopService, private route: ActivatedRoute) {
        this.route.params.subscribe(({ partyID, shopID }) => {
            this.fetchShopService.getShop(partyID, shopID);
        });
    }
}
