import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ShopDetailsService, ProviderInfo } from './shop-details.service';
import { Shop } from '../../gen-damsel/domain';

@Component({
    templateUrl: 'shop-details.component.html',
    styleUrls: ['../../shared/container.css'],
    providers: [ShopDetailsService]
})
export class ShopDetailsComponent implements OnInit {
    isLoading = false;
    shop: Shop;
    providerInfo: ProviderInfo[];

    constructor(private route: ActivatedRoute, private shopDetailsService: ShopDetailsService) {}

    ngOnInit() {
        this.isLoading = true;
        this.route.params
            .pipe(
                switchMap(({ partyId, shopId }) =>
                    this.shopDetailsService.initialize(partyId, shopId)
                )
            )
            .subscribe(({ shop, providerInfo }) => {
                this.isLoading = false;
                this.shop = shop;
                this.providerInfo = providerInfo;
            });
    }
}
