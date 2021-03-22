import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';

import { RevertState } from '../../../../../thrift-services/fistful/gen-model/deposit_revert';
import { FistfulStatisticsService } from '../../../../../thrift-services/fistful/fistful-stat.service';
import { DepositRevertParams } from '../../../../../query-dsl/deposit-revert';
import { FetchRevertsParams } from '../../types/fetch-reverts-params';

@Injectable()
export class FetchRevertsService extends PartialFetcher<RevertState, FetchRevertsParams> {
    constructor(private fistfulStatisticsService: FistfulStatisticsService) {
        super();
    }

    fetch(
        params: FetchRevertsParams,
        continuationToken: string
    ): Observable<FetchResult<RevertState>> {
        const depositRevertParams = FetchRevertsService.fetchParamsToRevertParams(params);
        return this.fistfulStatisticsService.getDepositReverts(
            depositRevertParams,
            continuationToken
        );
    }

    private static fetchParamsToRevertParams({
        depositID,
    }: FetchRevertsParams): DepositRevertParams {
        return { deposit_id: depositID };
    }
}
