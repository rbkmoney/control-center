import { Component, Input, OnInit } from '@angular/core';

import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { FetchShopProvidersService } from './fetch-shop-providers.service';

@Component({
    selector: 'cc-shop-providers',
    templateUrl: 'shop-providers.component.html',
    providers: [FetchShopProvidersService]
})
export class ShopProvidersComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    shopID: ShopID;

    providers$ = this.fetchProvidersService.providers$;

    constructor(private fetchProvidersService: FetchShopProvidersService) {
        this.providers$.subscribe(q => console.log(q));
    }

    ngOnInit() {
        this.fetchProvidersService.getProviders(this.partyID, this.shopID);
    }
}