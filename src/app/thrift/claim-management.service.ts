import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import { Claim, ClaimSearchResponse } from '../gen-damsel/claim_management';
import { ClaimSearchQuery } from './gen-nodejs/claim_management_types';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/cm', ClaimManagement);
    }

    // `any` because thrift need unions in statuses, not ClaimStatus[] from ClaimSearchQuery.
    // TODO: need converter???
    searchClaims = (query: any): Observable<ClaimSearchResponse> => {
        return this.toObservableAction('SearchClaims')(new ClaimSearchQuery(query));
    };

    getClaim = (partyID: string, claimID: number): Observable<Claim> => {
        return this.toObservableAction('GetClaim')(partyID, claimID);
    };
}
