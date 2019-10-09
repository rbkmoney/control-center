import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { QueryDSL } from '../query-dsl';

import { StatDeposit, StatResponse } from '../fistful/gen-model/fistful_stat';
import { DomainService } from '../domain';
import { FistfulStatisticsService } from '../fistful/fistful-stat.service';
import { SearchFormParams } from './search-form/search-form-params';

@Injectable()
export class DepositsService {
    searchDepositChanges$: Subject<StatDeposit[]> = new Subject<StatDeposit[]>();

    version: number;

    constructor(
        private fistfulStatisticsService: FistfulStatisticsService,
        private domainService: DomainService
    ) {
        this.domainService.version$.subscribe(version => (this.version = version));
    }

    fetchDeposits(params: SearchFormParams): Observable<StatDeposit[]> {
        return this.getAllDeposits(params);
    }

    private getAllDeposits(
        params: SearchFormParams,
        continuationToken?: string,
        payments: StatDeposit[] = []
    ): Observable<StatDeposit[]> {
        return this.getDeposits(params, continuationToken).pipe(
            mergeMap(res => {
                const mergedDeposits = [...payments, ...res.data.deposits];
                this.searchDepositChanges$.next(mergedDeposits);
                return res.continuation_token
                    ? this.getAllDeposits(params, res.continuation_token, mergedDeposits)
                    : of(mergedDeposits);
            })
        );
    }

    private getDeposits(
        params: SearchFormParams,
        continuationToken?: string
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
                        ...(walletId ? { wallet_d: walletId } : {})
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {})
        });
    }
}
