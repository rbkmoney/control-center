import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { FetchResult, PartialFetcher } from '../shared/partial-fetcher';
import { ClaimsService as ClaimManagementService } from '../thrift/claims.service';
import { booleanDebounceTime } from '../shared/partial-fetcher/operators/boolean-debounce-time';
import { ClaimInfo } from '../papi/model';
import { SearchFormValue } from './search-form/search-form-value';

@Injectable()
export class ClaimsService extends PartialFetcher<ClaimInfo[], SearchFormValue> {
    private readonly searchLimit = 20;

    claims$: Observable<any> = this.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open('An error occurred while processing your search', 'OK');
            return [];
        })
    );

    isLoading$: Observable<boolean> = this.doAction$.pipe(
        booleanDebounceTime(),
        shareReplay(1)
    );

    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        super();
    }

    protected fetch(params: SearchFormValue, token: string): Observable<FetchResult<any>> {
        return this.claimManagementService.getClaims({
            ...params,
            token,
            limit: this.searchLimit
        });
    }
}
