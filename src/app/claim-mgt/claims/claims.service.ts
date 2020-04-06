import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { booleanDebounceTime } from '../../shared/operators';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';
import { convertFormValueToParams } from './convert-form-value-to-params';
import { SearchFormValue } from './search-form/search-form-value';

@Injectable()
export class ClaimsService extends PartialFetcher<Claim, SearchFormValue> {
    private readonly searchLimit = 20;

    claims$: Observable<Claim> = this.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open('An error occurred while processing your search', 'OK');
            return [];
        })
    );

    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        super();
    }

    protected fetch(
        searchFormValue: SearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<Claim>> {
        return this.claimManagementService
            .searchClaims({
                ...convertFormValueToParams(searchFormValue),
                continuation_token: continuationToken,
                limit: this.searchLimit
            })
            .pipe(
                map(r => ({
                    result: r.result,
                    continuationToken: r.continuation_token
                }))
            );
    }
}
