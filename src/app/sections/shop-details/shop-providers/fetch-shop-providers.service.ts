import { Injectable } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../papi/party.service';
import { DomainTypedManager } from '../../../thrift-services/damsel';
import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { toProviderInfos } from './to-provider-infos';

@Injectable()
export class FetchShopProvidersService {
    private getProviderInfos$ = new Subject<{ partyID: PartyID; shopID: ShopID }>();

    providerInfos$ = this.getProviderInfos$.pipe(
        switchMap(({ partyID, shopID }) =>
            combineLatest([
                this.partyService.getShop(partyID, shopID),
                this.dtm.getProviderObjects(),
                this.dtm.getTerminalObjects(),
            ]).pipe(
                map(([shop, providers, terminalObjects]) =>
                    toProviderInfos(providers, terminalObjects, partyID, shopID)
                )
            )
        )
    );

    constructor(private partyService: PartyService, private dtm: DomainTypedManager) {
        this.providerInfos$.subscribe();
    }

    getProviderInfos(partyID: PartyID, shopID: ShopID) {
        this.getProviderInfos$.next({ partyID, shopID });
    }
}
