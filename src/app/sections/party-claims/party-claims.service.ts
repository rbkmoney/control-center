import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import {
    Claim,
    ClaimID,
    ClaimStatus,
} from '../../thrift-services/damsel/gen-model/claim_management';

const SEARCH_LIMIT = 10;

type PartyClaimsParams = { claim_id?: ClaimID; statuses?: (keyof ClaimStatus)[] };

@Injectable()
export class PartyClaimsService extends PartialFetcher<Claim, PartyClaimsParams> {
    constructor(
        private claimManagementService: ClaimManagementService,
        private route: ActivatedRoute
    ) {
        super();
    }

    protected fetch(
        params: PartyClaimsParams,
        continuationToken: string
    ): Observable<FetchResult<Claim>> {
        return this.route.params.pipe(
            pluck('partyID'),
            switchMap((partyId) =>
                this.claimManagementService.searchClaims({
                    party_id: partyId,
                    ...(params as any),
                    continuation_token: continuationToken,
                    limit: SEARCH_LIMIT,
                })
            ),
            map(({ result, continuation_token }) => ({
                result,
                continuationToken: continuation_token,
            }))
        );
    }
}
