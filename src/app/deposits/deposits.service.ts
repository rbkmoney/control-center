import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { QueryDSL } from '../query-dsl';
import { StatDeposit } from '../fistful/gen-model/fistful_stat';
import { FistfulStatisticsService } from '../fistful/fistful-stat.service';
import { SearchFormParams } from './search-form/search-form-params';
import { FetchResult, PartialFetcher } from '../partial-fetcher';
import { booleanDelay } from '../partial-fetcher/operators/boolean-delay';

@Injectable()
export class DepositsService extends PartialFetcher<StatDeposit, SearchFormParams> {
    private readonly searchLimit = 20;

    isLoading$: Observable<boolean>;

    constructor(private fistfulStatisticsService: FistfulStatisticsService) {
        super();
    }

    fetch(
        params: SearchFormParams,
        continuationToken: string
    ): Observable<FetchResult<StatDeposit>> {
        this.isLoading$ = this.searchResult$.pipe(
            booleanDelay(500, this.doAction$),
            shareReplay(1)
        );
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
                        size: this.searchLimit.toString()
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {})
        });
    }
}
