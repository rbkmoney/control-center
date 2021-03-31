import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FistfulStatisticsService } from '../../../../../thrift-services/fistful/fistful-stat.service';
import { FetchRevertsParams } from '../../types/fetch-reverts-params';
import { StatDepositRevert } from '../../../../../thrift-services/fistful/gen-model/fistful_stat';

@Injectable()
export class FetchRevertsService extends PartialFetcher<StatDepositRevert, FetchRevertsParams> {
    constructor(private fistfulStatisticsService: FistfulStatisticsService) {
        super();
    }

    fetch(
        params: FetchRevertsParams,
        continuationToken: string
    ): Observable<FetchResult<StatDepositRevert>> {
        return this.fistfulStatisticsService
            .getDepositReverts({ deposit_id: params.depositID }, continuationToken)
            .pipe(
                map((res) => ({
                    result: res.data.deposit_reverts,
                    continuationToken: res.continuation_token,
                }))
            );
    }
}
