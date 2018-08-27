import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Payout, PayoutsResponse } from '../papi/model';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from '../papi/params';
import { PayoutsService as PayoutsPapiService } from '../papi/payouts.service';

@Injectable()
export class PayoutsService {
    payouts$: Subject<Payout[]> = new Subject();
    lastSearchParams$: BehaviorSubject<PayoutSearchParams> = new BehaviorSubject({});

    constructor(private payoutsPapiService: PayoutsPapiService) {
    }

    get(params: PayoutSearchParams): Observable<PayoutsResponse> {
        this.lastSearchParams$.next(params);
        return this.payoutsPapiService.getPayouts(params)
            .pipe(tap((response) => this.payouts$.next(response.payouts)));
    }

    confirm(payoutsIds: string[]): Observable<string[]> {
        return this.payoutsPapiService.confirmPayouts(payoutsIds)
            .pipe(tap(() => this.get(this.lastSearchParams$.getValue()).subscribe()));
    }

    pay(payoutsIds: string[]) {
        return this.payoutsPapiService.pay(payoutsIds)
            .pipe(tap(() => this.get(this.lastSearchParams$.getValue()).subscribe()));
    }

    cancel(payoutId: string, params: PayoutCancelParams): Observable<void> {
        return this.payoutsPapiService.cancelPayout(payoutId, params)
            .pipe(tap(() => this.get(this.lastSearchParams$.getValue()).subscribe()));
    }

    create(params: PayoutCreateParams): Observable<Payout> {
        return this.payoutsPapiService.createPayout(params)
            .pipe(tap(() => this.get(this.lastSearchParams$.getValue()).subscribe()));
    }
}
