import { Injectable, NgZone } from '@angular/core';
import { FetchResult } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchFormParams } from '../../deposits/search-form/search-form-params';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { QueryDSL } from '../../query-dsl';
import { ThriftService } from '../thrift-service';
import { StatDeposit, StatRequest } from './gen-model/fistful_stat';
import * as FistfulStatistics from './gen-nodejs/FistfulStatistics';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/fistful_stat_types';

@Injectable()
export class FistfulStatisticsService extends ThriftService {
    private readonly searchLimit = 20;

    constructor(keycloakTokenInfoService: KeycloakTokenInfoService, zone: NgZone) {
        super(zone, keycloakTokenInfoService, '/fistful/stat', FistfulStatistics);
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
                        ...(walletId ? { wallet_id: walletId } : {}),
                        size: this.searchLimit.toString()
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {})
        };
    }
}
