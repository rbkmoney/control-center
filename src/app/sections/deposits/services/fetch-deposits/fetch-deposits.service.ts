import { Injectable } from '@angular/core';
import { booleanDelay } from '@cc/utils/boolean-delay';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { FistfulStatisticsService } from '../../../../thrift-services/fistful/fistful-stat.service';
import { StatDeposit } from '../../../../thrift-services/fistful/gen-model/fistful_stat';
import { SearchParams } from '../../types/search-params';

@Injectable()
export class FetchDepositsService extends PartialFetcher<StatDeposit, SearchParams> {
    isLoading$ = this.doAction$.pipe(booleanDelay(), shareReplay(1));

    constructor(private fistfulStatisticsService: FistfulStatisticsService) {
        super();
    }

    fetch(params: SearchParams, continuationToken: string): Observable<FetchResult<StatDeposit>> {
        return this.fistfulStatisticsService.getDeposits(params, continuationToken);
    }
}
