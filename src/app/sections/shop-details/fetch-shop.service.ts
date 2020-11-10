import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../papi/party.service';
import { PartyID, ShopID } from '../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchShopService {
    private getShop$ = new Subject<{ partyID: PartyID; shopID: ShopID }>();
    private hasError$: Subject<any> = new Subject();

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

    inProgress$ = progress(this.getShop$, merge(this.shop$, this.hasError$));

    constructor(private partyService: PartyService, private snackBar: MatSnackBar) {
        this.shop$.subscribe();
    }

    getShop(partyID: PartyID, shopID: ShopID) {
        this.getShop$.next({ shopID, partyID });
    }
}
