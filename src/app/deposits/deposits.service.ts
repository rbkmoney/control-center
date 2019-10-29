import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { StatDeposit } from '../fistful/gen-model/fistful_stat';
import { FistfulStatisticsService } from '../fistful/fistful-stat.service';
import { SearchFormParams } from './search-form/search-form-params';
import { FetchResult, PartialFetcher } from '../partial-fetcher';
import { booleanDelay } from '../custom-operators';

@Injectable()
export class DepositsService extends PartialFetcher<StatDeposit, SearchFormParams> {
    isLoading$ = this.searchResult$.pipe(
        booleanDelay(500, this.doAction$),
        shareReplay(1)
    );

    constructor(private fistfulStatisticsService: FistfulStatisticsService) {
        super();
    }

    fetch(
        params: SearchFormParams,
        continuationToken: string
    ): Observable<FetchResult<StatDeposit>> {
        return this.fistfulStatisticsService.getDeposits(params, continuationToken);
    }
}
