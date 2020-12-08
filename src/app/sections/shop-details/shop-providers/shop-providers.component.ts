import { Component, Input, OnInit } from '@angular/core';

import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { FetchShopProvidersService } from './fetch-shop-providers.service';

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

    providerInfos$ = this.fetchProvidersService.providerInfos$;
    inProgress$ = this.fetchProvidersService.inProgress$;

    constructor(private fetchProvidersService: FetchShopProvidersService) {}

    ngOnInit() {
        this.getProviders();
    }

    terminalChanged() {
        this.getProviders();
    }

    getProviders() {
        this.fetchProvidersService.getProviderInfos(this.partyID, this.shopID);
    }
}
