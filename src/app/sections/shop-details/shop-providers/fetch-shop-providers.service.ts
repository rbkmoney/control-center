import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { DomainTypedManager } from '../../../thrift-services/damsel';
import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';
import { toProviderInfos } from './to-provider-infos';

@Injectable()
export class FetchShopProvidersService {
    private getProviderInfos$ = new Subject<{ partyID: PartyID; shopID: ShopID }>();

    providerInfos$ = this.getProviderInfos$.pipe(
        switchMap(({ partyID, shopID }) =>
            combineLatest([this.dtm.getProviderObjects(), this.dtm.getTerminalObjects()]).pipe(
                map(([providers, terminalObjects]) =>
                    toProviderInfos(providers, terminalObjects, partyID, shopID)
                )
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.getProviderInfos$, this.providerInfos$).pipe(startWith(true));

    constructor(private dtm: DomainTypedManager) {
        this.providerInfos$.subscribe();
    }

    getProviderInfos(partyID: PartyID, shopID: ShopID) {
        this.getProviderInfos$.next({ partyID, shopID });
    }
}
