import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Payout } from '../papi/model';
import { PayoutCancelParams, PayoutCreateParams, PayoutSearchParams } from '../papi/params';
import { PayoutsService as PayoutsPapiService } from '../papi/payouts.service';

@Injectable()
export class PayoutsService {

    constructor(private payoutsPapiService: PayoutsPapiService) {
    }

    get(params: PayoutSearchParams): Observable<Payout[]> {
        return this.payoutsPapiService.getPayouts(params)
            .pipe(map((response) => response.payouts));
    }

    confirm(payoutsIds: string[]): Observable<void> {
        return this.payoutsPapiService.confirmPayouts(payoutsIds)
            .pipe(map(() => null));
    }

    pay(payoutsIds: string[]): Observable<void> {
        return this.payoutsPapiService.pay(payoutsIds)
            .pipe(map(() => null));

    }

    cancel(payoutId: string, params: PayoutCancelParams): Observable<void> {
        return this.payoutsPapiService.cancelPayout(payoutId, params)
            .pipe(map(() => null));

    }

    create(params: PayoutCreateParams): Observable<Payout> {
        return this.payoutsPapiService.createPayout(params);
    }
}
