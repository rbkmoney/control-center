import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift-service';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import {
    ClaimSearchQuery as ClaimSearchQueryType,
    Modification as ModificationType
} from './gen-nodejs/claim_management_types';
import {
    Claim,
    ClaimID,
    ClaimRevision,
    ClaimSearchQuery,
    ClaimSearchResponse,
    Modification
} from './gen-model/claim_management';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/cm', ClaimManagement);
    }

    searchClaims = (query: ClaimSearchQuery): Observable<ClaimSearchResponse> =>
        this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));

    getClaim = (partyID: string, claimID: ClaimID): Observable<Claim> =>
        this.toObservableAction('GetClaim')(partyID, claimID);

    updateClaim = (
        partyID: string,
        claimID: ClaimID,
        revision: ClaimRevision,
        changeset: Modification[]
    ): Observable<void> =>
        this.toObservableAction('UpdateClaim')(
            partyID,
            claimID,
            revision,
            changeset.map(m => new ModificationType(m))
        );
}
