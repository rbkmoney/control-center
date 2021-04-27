import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchFormValue } from '@cc/app/shared/components';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';

const SEARCH_LIMIT = 10;

@Injectable()
export class PartyClaimsService extends PartialFetcher<Claim, SearchFormValue> {
    constructor(
        private claimManagementService: ClaimManagementService,
        private route: ActivatedRoute
    ) {
        super();
    }

    protected fetch(params: any, continuationToken: string): Observable<FetchResult<Claim>> {
        return this.route.params.pipe(
            pluck('partyID'),
            switchMap((partyId) =>
                this.claimManagementService.searchClaims({
                    party_id: partyId,
                    ...params,
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
