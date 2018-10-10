import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Payout } from '../papi/model';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from '../papi/params';
import { PayoutsService as PayoutsPapiService } from '../papi/payouts.service';

@Injectable()
export class PayoutsService {
    payouts$: Subject<Payout[]> = new Subject();
    private lastSearchParams: PayoutSearchParams;

    constructor(private payoutsPapiService: PayoutsPapiService) {
    }

    get(params: PayoutSearchParams): Observable<void> {
        this.lastSearchParams = params;
        return this.payoutsPapiService.getPayouts(params)
            .pipe(
                map((response) => this.payouts$.next(response.payouts))
            );
    }

    confirm(payoutsIds: string[]): Observable<void> {
        return this.payoutsPapiService.confirmPayouts(payoutsIds)
            .pipe(
                switchMap(() => this.get(this.lastSearchParams))
            );
    }

    pay(payoutsIds: string[]): Observable<void> {
        return this.payoutsPapiService.pay(payoutsIds)
            .pipe(
                switchMap(() => this.get(this.lastSearchParams))
            );
    }

    cancel(payoutId: string, params: PayoutCancelParams): Observable<void> {
        return this.payoutsPapiService.cancelPayout(payoutId, params)
            .pipe(
                switchMap(() => this.get(this.lastSearchParams))
            );
    }

    create(params: PayoutCreateParams): Observable<Payout> {
        return this.payoutsPapiService.createPayout(params);
    }
}
