import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { QueryDSL } from '../query-dsl';

import { StatDeposit, StatResponse } from '../fistful/gen-model/fistful_stat';
import { FistfulStatisticsService } from '../fistful/fistful-stat.service';
import { SearchFormParams } from './search-form/search-form-params';

@Injectable()
export class DepositsService {
    deposits$ = new BehaviorSubject<StatDeposit[]>([]);

    continuationToken$ = new BehaviorSubject<string>(null);

    private limit = 20;

    constructor(private fistfulStatisticsService: FistfulStatisticsService) {}

    fetchDeposits(params: SearchFormParams) {
        this.getDeposits(params).pipe(take(1)).subscribe((res) => {
            this.deposits$.next(this.deposits$.value.concat(res.data.deposits));
            this.continuationToken$.next(res.continuation_token);
        });
    }

    private getDeposits(
        params: SearchFormParams
    ): Observable<StatResponse> {
        const {
            fromTime,
            toTime,
            amountTo,
            currencyCode,
            depositId,
            identityId,
            partyId,
            sourceId,
            status,
            walletId
        } = params;
        return this.fistfulStatisticsService.getDeposits({
            dsl: JSON.stringify({
                query: {
                    deposits: {
                        from_time: fromTime,
                        to_time: toTime,
                        ...(amountTo ? { amount_to: amountTo } : {}),
                        ...(currencyCode ? { currency_code: currencyCode } : {}),
                        ...(depositId ? { deposit_id: depositId } : {}),
                        ...(identityId ? { identity_id: identityId } : {}),
                        ...(partyId ? { party_id: partyId } : {}),
                        ...(sourceId ? { source_id: sourceId } : {}),
                        ...(status ? { status } : {}),
                        ...(walletId ? { wallet_d: walletId } : {}),
                        size: this.limit.toString()
                    }
                }
            } as QueryDSL),
            ...(this.continuationToken$.value ? { continuation_token: this.continuationToken$.value } : {})
        });
    }
}
