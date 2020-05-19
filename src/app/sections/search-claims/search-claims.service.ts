import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';
import { SearchFormValue } from '../claim-search-form';

@Injectable()
export class SearchClaimsService extends PartialFetcher<Claim, SearchFormValue> {
    private readonly searchLimit = 20;

    claims$: Observable<Claim[]> = this.searchResult$.pipe();

    constructor(private claimManagementService: ClaimManagementService) {
        super();
    }

    protected fetch(params: any, continuationToken: string): Observable<FetchResult<Claim>> {
        return this.claimManagementService
            .searchClaims({
                ...params,
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
