import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Payout, PayoutsResponse } from '../papi/model';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from '../papi/params';
import { PayoutsService as PayoutsPapiService } from '../papi/payouts.service';

@Injectable()
export class PayoutsService {
    private lastSearchParams: PayoutSearchParams;

    constructor(private payoutsPapiService: PayoutsPapiService) {
    }

    get(params: PayoutSearchParams): Observable<PayoutsResponse> {
        this.lastSearchParams = params;
        return this.payoutsPapiService.getPayouts(params);
    }

    confirm(payoutsIds: string[]): Observable<void> {
        return this.payoutsPapiService.confirmPayouts(payoutsIds)
            .pipe(
                switchMap(() => this.get(this.lastSearchParams)),
                map(() => null)
            );
    }

    pay(payoutsIds: string[]): Observable<void> {
        return this.payoutsPapiService.pay(payoutsIds)
            .pipe(
                switchMap(() => this.get(this.lastSearchParams)),
                map(() => null)
            );
    }

    cancel(payoutId: string, params: PayoutCancelParams): Observable<void> {
        return this.payoutsPapiService.cancelPayout(payoutId, params)
            .pipe(
                switchMap(() => this.get(this.lastSearchParams)),
                map(() => null)
            );
    }

    create(params: PayoutCreateParams): Observable<Payout> {
        return this.payoutsPapiService.createPayout(params);
    }
}
