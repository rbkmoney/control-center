import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PartyID } from '@cc/app/api/damsel/gen-model/domain';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import {
    Claim,
    ClaimID,
    ClaimStatus,
} from '../../thrift-services/damsel/gen-model/claim_management';

type SearchClaimsParams = {
    claim_id?: ClaimID;
    statuses?: (keyof ClaimStatus)[];
    party_id: PartyID;
};

@Injectable()
export class SearchClaimsService extends PartialFetcher<Claim, SearchClaimsParams> {
    claims$: Observable<Claim[]> = this.searchResult$;

    private readonly searchLimit = 10;

    constructor(private claimManagementService: ClaimManagementService) {
        super();
    }

    protected fetch(
        params: SearchClaimsParams,
        continuationToken: string
    ): Observable<FetchResult<Claim>> {
        return this.claimManagementService
            .searchClaims({
                ...(params as any),
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
