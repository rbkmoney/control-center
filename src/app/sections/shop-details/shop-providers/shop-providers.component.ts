import { Component, Input, OnInit } from '@angular/core';

import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { FetchShopProvidersService } from './services';

@Component({
    selector: 'cc-shop-providers',
    templateUrl: 'shop-providers.component.html',
    providers: [FetchShopProvidersService],
})
export class ShopProvidersComponent implements OnInit {
    @Input()
    partyID: PartyID;

    @Input()
    shopID: ShopID;

    providerInfo$ = this.fetchProvidersService.providerInfo$;
    inProgress$ = this.fetchProvidersService.inProgress$;

    constructor(private fetchProvidersService: FetchShopProvidersService) {}

    ngOnInit() {
        this.getProviders();
    }

    getProviders() {
        this.fetchProvidersService.getProviderInfo(this.partyID, this.shopID);
    }
}
