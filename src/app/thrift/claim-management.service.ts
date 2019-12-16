import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { ThriftService } from '../thrift';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import { Claim, ClaimSearchQuery, ClaimSearchResponse } from '../gen-damsel/claim_management';
import { ClaimSearchQuery as ClaimSearchQueryType } from './gen-nodejs/claim_management_types';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/cm', ClaimManagement);
    }

    searchClaims = (query: ClaimSearchQuery): Observable<ClaimSearchResponse> =>
        this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));

    getClaim = (partyID: string, claimID: number): Observable<Claim> => {
        return this.toObservableAction('GetClaim')(partyID, claimID);
    };

    acceptClaim = (partyID: string, claimID: number, revision: number): Observable<void> => {
        return this.toObservableAction('AcceptClaim')(partyID, claimID, revision);
    };

    denyClaim = (
        partyID: string,
        claimID: number,
        revision: number,
        reason: string
    ): Observable<void> => {
        return this.toObservableAction('DenyClaim')(partyID, claimID, revision, reason);
    };
}
