import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import { ClaimSearchQuery, ClaimSearchResponse } from '../gen-damsel/claim_management';
import { ClaimSearchQuery as ClaimSearchQueryType } from './gen-nodejs/claim_management_types';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class ClaimManagementService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/cm', ClaimManagement);
    }

    searchClaims = (query: ClaimSearchQuery): Observable<ClaimSearchResponse> =>
        this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));
}
