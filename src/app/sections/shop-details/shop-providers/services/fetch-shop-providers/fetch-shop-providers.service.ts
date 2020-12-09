import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../../thrift-services/damsel';
import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { toProviderInfo } from './to-provider-info';

@Injectable()
export class FetchShopProvidersService {
    private getProviderInfo$ = new BehaviorSubject<{ partyID: PartyID; shopID: ShopID }>(null);

    providerInfo$ = this.getProviderInfo$.pipe(
        switchMap(({ partyID, shopID }) =>
            combineLatest([this.dtm.getProviderObjects(), this.dtm.getTerminalObjects()]).pipe(
                map(([providerObjects, terminalObjects]) =>
                    toProviderInfo(providerObjects, terminalObjects, partyID, shopID)
                )
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.getProviderInfo$, this.providerInfo$).pipe(startWith(true));

    constructor(private dtm: DomainTypedManager) {}

    getProviderInfo(partyID: PartyID, shopID: ShopID) {
        this.getProviderInfo$.next({ partyID, shopID });
    }
}
