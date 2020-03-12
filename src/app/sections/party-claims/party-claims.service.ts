import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';
import { booleanDebounceTime } from '../../shared/operators';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { SearchFormValue } from './search-form-value';
import { convertFormValueToParams } from '../../claim-mgt/claims/convert-form-value-to-params';

@Injectable()
export class PartyClaimsService extends PartialFetcher<Claim, SearchFormValue> {
    private readonly searchLimit = 20;

    claims$: Observable<Claim> = this.searchResult$.pipe(
        catchError(e => {
            this.snackBar.open(`An error occurred while search claim (${e})`, 'OK');
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
