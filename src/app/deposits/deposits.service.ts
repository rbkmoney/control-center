import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { StatDeposit } from '../fistful/gen-model/fistful_stat';
import { FistfulStatisticsService } from '../fistful/fistful-stat.service';
import { SearchFormParams } from './search-form/search-form-params';
import { booleanDelay } from '../custom-operators';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';

@Injectable()
export class DepositsService extends PartialFetcher<StatDeposit, SearchFormParams> {
    isLoading$ = this.doAction$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    constructor(
        private fistfulStatisticsService: FistfulStatisticsService,
        private dialog: MatDialog
    ) {
        super();
    }

    fetch(
        params: SearchFormParams,
        continuationToken: string
    ): Observable<FetchResult<StatDeposit>> {
        return this.fistfulStatisticsService.getDeposits(params, continuationToken);
    }

    createDeposit() {
        this.dialog
            .open(CreateDepositComponent, { disableClose: true })
            .afterClosed()
            .pipe(filter(deposit => !!deposit))
            .subscribe(deposit => {
                const polledDepositParams: SearchFormParams = {
                    fromTime: moment()
                        .startOf('d')
                        .toISOString(),
                    toTime: moment()
                        .endOf('d')
                        .toISOString(),
                    depositId: deposit.id
                };
                this.search(polledDepositParams);
            });
    }
}
