import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { ThriftService } from '../thrift-service';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import { ClaimSearchQuery as ClaimSearchQueryType } from './gen-nodejs/claim_management_types';
import {
    Claim,
    ClaimID,
    ClaimSearchQuery,
    ClaimSearchResponse
} from './gen-model/claim_management';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/cm', ClaimManagement);
    }

    searchClaims = (query: ClaimSearchQuery): Observable<ClaimSearchResponse> =>
        this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));

    getClaim = (partyID: string, claimID: ClaimID): Observable<Claim> =>
        this.toObservableAction('GetClaim')(partyID, claimID);

    acceptClaim = (partyID: string, claimID: ClaimID): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap(claim =>
                this.toObservableAction('AcceptClaim')(partyID, claimID, claim.revision)
            )
        );

    requestClaimReview = (partyID: string, claimID: ClaimID): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap(claim =>
                this.toObservableAction('RequestClaimReview')(partyID, claimID, claim.revision)
            )
        );

    requestClaimChanges = (partyID: string, claimID: ClaimID): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap(claim =>
                this.toObservableAction('RequestClaimChanges')(partyID, claimID, claim.revision)
            )
        );

    denyClaim = (partyID: string, claimID: ClaimID, reason: string): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap(claim =>
                this.toObservableAction('DenyClaim')(partyID, claimID, claim.revision, reason)
            )
        );

    revokeClaim = (partyID: string, claimID: ClaimID, reason: string): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap(claim =>
                this.toObservableAction('RevokeClaim')(partyID, claimID, claim.revision, reason)
            )
        );
}
