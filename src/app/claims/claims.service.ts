import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';

import { ClaimManagementService as ClaimManagementService } from '../thrift/claim-management.service';
import { ClaimInfo } from '../papi/model';
import { SearchFormValue } from './search-form/search-form-value';
import { booleanDebounceTime } from '../shared/operators';
import { convertFormValueToParams } from './convert-form-value-to-params';
import { ClaimSearchQuery } from '../gen-damsel/claim_management';

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

    protected fetch(searchFormValue: SearchFormValue, continuationToken: string): Observable<FetchResult<any>> {
        return this.claimManagementService.getClaims({
            ...convertFormValueToParams(searchFormValue),
            continuationToken,
            limit: this.searchLimit
        } as ClaimSearchQuery);
    }
}
