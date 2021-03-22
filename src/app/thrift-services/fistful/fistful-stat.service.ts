import { Injectable, NgZone } from '@angular/core';
import { FetchResult } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { removeEmptyProperties } from '@cc/utils/remove-empty-properties';
import { SearchFormParams } from '../../deposits/search-form/search-form-params';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { QueryDSL } from '../../query-dsl';
import { ThriftService } from '../services/thrift/thrift-service';
import { DepositRevertParams } from '../../query-dsl/deposit-revert';
import { StatDeposit, StatRequest } from './gen-model/fistful_stat';
import * as FistfulStatistics from './gen-nodejs/FistfulStatistics';
import { StatRequest as ThriftStatRequest } from './gen-nodejs/fistful_stat_types';
import { RevertState } from './gen-model/deposit_revert';

@Injectable()
export class FistfulStatisticsService extends ThriftService {
    private readonly DEPOSITS_SEARCH_LIMIT = 20;
    private readonly REVERTS_SEARCH_LIMIT = 5;

    constructor(keycloakTokenInfoService: KeycloakTokenInfoService, zone: NgZone) {
        super(zone, keycloakTokenInfoService, '/fistful/stat', FistfulStatistics);
    }

    getDeposits(
        params: SearchFormParams,
        continuationToken?: string
    ): Observable<FetchResult<StatDeposit>> {
        const request: StatRequest = this.depositParamsToRequest(params, continuationToken);
        return this.toObservableAction('GetDeposits')(new ThriftStatRequest(request)).pipe(
            map((res) => ({
                result: res.data.deposits,
                continuationToken: res.continuation_token,
            }))
        );
    }

    getDepositReverts(
        params: DepositRevertParams,
        continuationToken?: string
    ): Observable<FetchResult<RevertState>> {
        const request: StatRequest = this.depositRevertsParamsToRequest(params, continuationToken);
        return this.toObservableAction('GetDepositReverts')(new ThriftStatRequest(request)).pipe(
            map((res) => ({
                result: res.data.deposits,
                continuationToken: res.continuation_token,
            }))
        );
    }

    private depositParamsToRequest(
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
            walletId,
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
                        size: this.DEPOSITS_SEARCH_LIMIT.toString(),
                    },
                },
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {}),
        };
    }

    private depositRevertsParamsToRequest(
        params: DepositRevertParams,
        continuationToken?: string
    ): StatRequest {
        return {
            dsl: JSON.stringify({
                query: {
                    deposit_reverts: {
                        ...removeEmptyProperties(params),
                        size: this.REVERTS_SEARCH_LIMIT.toString(),
                    },
                },
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {}),
        };
    }
}
