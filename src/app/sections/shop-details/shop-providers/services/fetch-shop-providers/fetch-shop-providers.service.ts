import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../../../../../thrift-services/damsel/domain-cache.service';
import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { toProvidersInfo } from './to-providers-info';

@Injectable()
export class FetchShopProvidersService {
    private getProvidersInfo$ = new BehaviorSubject<{ partyID: PartyID; shopID: ShopID }>(null);

    providersInfo$ = this.getProvidersInfo$.pipe(
        switchMap(({ partyID, shopID }) =>
            combineLatest([this.dcs.getObjects('provider'), this.dcs.getObjects('terminal')]).pipe(
                map(([providerObjects, terminalObjects]) =>
                    toProvidersInfo(providerObjects, terminalObjects, partyID, shopID)
                )
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.getProvidersInfo$, this.providersInfo$).pipe(startWith(true));

    constructor(private dcs: DomainCacheService) {}

    getProvidersInfo(partyID: PartyID, shopID: ShopID) {
        this.getProvidersInfo$.next({ partyID, shopID });
    }
}
