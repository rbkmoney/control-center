import { Injectable, NgZone } from '@angular/core';
import { merge, Observable, Subject, timer } from 'rxjs';
import { map, mergeMap, takeLast, takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { ThriftService } from '../thrift';
import * as FistfulStatistics from './gen-nodejs/FistfulStatistics';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/fistful_stat_types';
import { StatDeposit, StatRequest } from './gen-model/fistful_stat';
import { FetchResult } from '../partial-fetcher';
import { SearchFormParams } from '../deposits/search-form/search-form-params';
import { QueryDSL } from '../query-dsl';
import { depositStatus } from '../deposits/deposit-status';

@Injectable()
export class FistfulStatisticsService extends ThriftService {
    private readonly searchLimit = 20;

    private stopPolling$ = new Subject<boolean>();

    constructor(zone: NgZone) {
        super(zone, '/fistful/stat', FistfulStatistics);
    }

    getDeposits(
        params: SearchFormParams,
        continuationToken?: string
    ): Observable<FetchResult<StatDeposit>> {
        const request: StatRequest = this.searchParamsToRequest(params, continuationToken);
        return this.toObservableAction('GetDeposits')(new ThriftStatRequest(request)).pipe(
            map(res => ({
                result: res.data.deposits,
                continuationToken: res.continuation_token
            }))
        );
    }

    pollCreatedDeposit(depositId: string): Observable<FetchResult<StatDeposit>> {
        return this.startPollingDeposit(depositId).pipe(
            takeUntil(merge(this.stopPolling$, timer(30000))),
            takeLast(1)
        );
    }

    private startPollingDeposit(
        depositId: string,
        pollingInterval = 3000
    ): Observable<FetchResult<StatDeposit>> {
        const newDepositParams: SearchFormParams = {
            fromTime: moment()
                .startOf('d')
                .toISOString(),
            toTime: moment()
                .endOf('d')
                .toISOString(),
            depositId
        };
        return timer(0, pollingInterval).pipe(
            mergeMap(() => this.getDeposits(newDepositParams)),
            tap(res => this.stopPollingCondition(res.result[0]))
        );
    }

    private stopPollingCondition(deposit: StatDeposit): boolean {
        return !!deposit && depositStatus(deposit.status) !== 'pending';
    }

    private searchParamsToRequest(
        params: SearchFormParams,
        continuationToken?: string
    ): StatRequest {
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
        return {
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
        };
    }
}
