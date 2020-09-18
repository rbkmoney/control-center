import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { NavigationParams } from './navigation-params';

@Injectable()
export class PartyPaymentsService {
    private navigationParamsChanges$ = new Subject<NavigationParams>();

    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    paymentNavigationLink$ = this.navigationParamsChanges$.pipe(
        switchMap((params) => combineLatest([of(params), this.partyID$])),
        map(
            ([{ invoiceID, paymentID }, partyID]) =>
                `/party/${partyID}/invoice/${invoiceID}/payment/${paymentID}`
        )
    );

    constructor(private route: ActivatedRoute) {}

    updatePaymentNavigationLink(params: NavigationParams) {
        this.navigationParamsChanges$.next(params);
    }
}
