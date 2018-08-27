import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, repeatWhen, switchMap, takeWhile, tap } from 'rxjs/operators';
import isEqual from 'lodash-es/isEqual';

import { Payout, PayoutsResponse } from '../papi/model';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from '../papi/params';
import { PayoutsService as PayoutsPapiService } from '../papi/payouts.service';

@Injectable()
export class PayoutsService {
    payouts$: BehaviorSubject<Payout[]> = new BehaviorSubject([]);

    private lastSearchParams: PayoutSearchParams;

    constructor(private payoutsPapiService: PayoutsPapiService) {
    }

    get(params: PayoutSearchParams): Observable<PayoutsResponse> {
        this.lastSearchParams = params;
        return this.payoutsPapiService.getPayouts(params)
            .pipe(tap((response) => this.payouts$.next(response.payouts)));
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

    create(params: PayoutCreateParams): Observable<void> {
        return this.payoutsPapiService.createPayout(params)
            .pipe(
                switchMap(() => this.pollCreatedPayout(this.payouts$.getValue()[0])),
                map(() => null)
            );
    }

    private pollCreatedPayout(payout: Payout, delayMs = 2000, retryCount = 15): Observable<void> {
        let newLastPayout;
        const currentLastPayout = payout;
        return Observable.create((observer) => {
            this.get(this.lastSearchParams)
                .pipe(
                    repeatWhen((notifications) => {
                        return notifications.pipe(
                            delay(delayMs),
                            takeWhile((value, retries) => isEqual(newLastPayout, currentLastPayout) && retries <= retryCount)
                        );
                    })
                )
                .subscribe((response) => {
                    newLastPayout = response.payouts[0];
                    if (!isEqual(newLastPayout, currentLastPayout)) {
                        observer.next();
                        observer.complete();
                        this.payouts$.next(response.payouts);
                    }
                });
        });
    }
}
