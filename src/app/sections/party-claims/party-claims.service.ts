import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';
import { SearchFormValue } from '../claim-search-form';

const SEARCH_LIMIT = 20;

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
            switchMap((party_id) =>
                this.claimManagementService.searchClaims({
                    party_id,
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
