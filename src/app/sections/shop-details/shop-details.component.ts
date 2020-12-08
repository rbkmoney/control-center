import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { FetchShopService } from './fetch-shop.service';

@Component({
    templateUrl: 'shop-details.component.html',
    providers: [FetchShopService],
})
export class ShopDetailsComponent {
    partyID$ = this.route.params.pipe(pluck('partyID'));
    shopID$ = this.route.params.pipe(pluck('shopID'));

    shop$ = this.fetchShopService.shop$;
    inProgress$ = this.fetchShopService.inProgress$;

    constructor(private fetchShopService: FetchShopService, private route: ActivatedRoute) {
        combineLatest([this.partyID$, this.shopID$]).subscribe(([partyID, shopID]) => {
            this.fetchShopService.getShop(partyID, shopID);
        });
    }
}
