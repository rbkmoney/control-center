import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';
import { booleanDebounceTime } from '../../shared/operators';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { SearchFormValue } from './search-form-value';
import { convertFormValueToParams } from './convert-form-value-to-params';

@Injectable()
export class PartyClaimsService extends PartialFetcher<Claim, SearchFormValue> {
    private readonly searchLimit = 1;

    claims$: Observable<Claim[]> = this.searchResult$;

    isLoading$: Observable<boolean> = this.doAction$.pipe(
        startWith(true),
        booleanDebounceTime(),
        shareReplay(1)
    );

    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {
        super();

        this.errors$.subscribe(e => {
            this.snackBar.open(`An error occurred while search claim (${e})`, 'OK');
        });
    }

    protected fetch(
        searchFormValue: SearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<Claim>> {
        return this.route.params.pipe(
            pluck('partyID'),
            switchMap(party_id =>
                this.claimManagementService.searchClaims({
                    party_id: 'party_id',
                    ...convertFormValueToParams(searchFormValue),
                    continuation_token: continuationToken,
                    limit: this.searchLimit
                })
            ),
            map(r => ({
                result: r.result,
                continuationToken: r.continuation_token
            }))
        );
    }
}
