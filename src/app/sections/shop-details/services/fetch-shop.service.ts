import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/utils';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../papi/party.service';
import { PartyID, ShopID } from '../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchShopService {
    private getShop$ = new BehaviorSubject<{ partyID: PartyID; shopID: ShopID }>(null);
    private hasError$: Subject<any> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    shop$ = this.getShop$.pipe(
        switchMap(({ partyID, shopID }) =>
            this.partyService.getShop(partyID, shopID).pipe(
                catchError((e) => {
                    this.hasError$.next(e);
                    this.snackBar.open('An error occurred while fetching shop', 'OK');
                    return of('error');
                })
            )
        ),
        filter((result) => result !== 'error'),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$ = progress(this.getShop$, merge(this.shop$, this.hasError$)).pipe(startWith(true));

    constructor(private partyService: PartyService, private snackBar: MatSnackBar) {}

    getShop(partyID: PartyID, shopID: ShopID) {
        this.getShop$.next({ shopID, partyID });
    }
}
