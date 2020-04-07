import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import {
    Claim,
    ClaimID,
    ClaimSearchQuery,
    ClaimSearchResponse,
    Modification
} from './gen-model/claim_management';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import {
    ClaimSearchQuery as ClaimSearchQueryType,
    Modification as ModificationType
} from './gen-nodejs/claim_management_types';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/cm', ClaimManagement);
    }

    createClaim = (partyID: string, changeset: Modification[]): Observable<Claim> =>
        this.toObservableAction('CreateClaim')(partyID, changeset);

    searchClaims = (query: ClaimSearchQuery): Observable<ClaimSearchResponse> =>
        this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));

    getClaim = (partyID: string, claimID: ClaimID): Observable<Claim> =>
        this.toObservableAction('GetClaim')(partyID, claimID);

    acceptClaim = (partyID: string, claimID: ClaimID): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap((claim) =>
                this.toObservableAction('AcceptClaim')(partyID, claimID, claim.revision)
            )
        );

    requestClaimReview = (partyID: string, claimID: ClaimID): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap((claim) =>
                this.toObservableAction('RequestClaimReview')(partyID, claimID, claim.revision)
            )
        );

    requestClaimChanges = (partyID: string, claimID: ClaimID): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap((claim) =>
                this.toObservableAction('RequestClaimChanges')(partyID, claimID, claim.revision)
            )
        );

    denyClaim = (partyID: string, claimID: ClaimID, reason: string): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap((claim) =>
                this.toObservableAction('DenyClaim')(partyID, claimID, claim.revision, reason)
            )
        );

    revokeClaim = (partyID: string, claimID: ClaimID, reason: string): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap((claim) =>
                this.toObservableAction('RevokeClaim')(partyID, claimID, claim.revision, reason)
            )
        );

    updateClaim = (
        partyID: string,
        claimID: ClaimID,
        changeset: Modification[]
    ): Observable<void> =>
        this.getClaim(partyID, claimID).pipe(
            switchMap((claim) =>
                this.toObservableAction('UpdateClaim')(
                    claim.party_id,
                    claim.id,
                    claim.revision,
                    changeset.map((m) => new ModificationType(m))
                )
            )
        );
}
