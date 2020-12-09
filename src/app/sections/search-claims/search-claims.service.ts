import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchFormValue } from '@cc/app/shared/components';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';

@Injectable()
export class SearchClaimsService extends PartialFetcher<Claim, SearchFormValue> {
    private readonly searchLimit = 10;

    claims$: Observable<Claim[]> = this.searchResult$;

    constructor(private claimManagementService: ClaimManagementService) {
        super();
    }

    protected fetch(params: any, continuationToken: string): Observable<FetchResult<Claim>> {
        return this.claimManagementService
            .searchClaims({
                ...params,
                continuation_token: continuationToken,
                limit: this.searchLimit,
            })
            .pipe(
                map((r) => ({
                    result: r.result,
                    continuationToken: r.continuation_token,
                }))
            );
    }
}
