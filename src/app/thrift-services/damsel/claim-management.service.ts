import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift-service';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import { ClaimSearchQuery as ClaimSearchQueryType } from './gen-nodejs/claim_management_types';
import { KeycloakService } from 'keycloak-angular';
import { Claim, ClaimSearchQuery, ClaimSearchResponse } from './gen-model/claim_management';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/cm', ClaimManagement);
    }

    searchClaims = (query: ClaimSearchQuery): Observable<ClaimSearchResponse> =>
        this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));

    getClaim = (partyID: string, claimID: number): Observable<Claim> =>
        this.toObservableAction('GetClaim')(partyID, claimID);
}
