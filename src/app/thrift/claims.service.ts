import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift';
import * as ClaimManagement from './gen-nodejs/ClaimManagement';
import { ClaimSearchQuery } from '../gen-damsel/claim_management';
import { ClaimSearchQuery as ClaimSearchQueryType } from './gen-nodejs/claim_management_types';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class ClaimsService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/cm', ClaimManagement);
    }

    getClaims = (query: ClaimSearchQuery): Observable<any> => {
        // console.log(query);
        // console.log(this.toObservableAction('SearchClaims'));
        // console.log((new ClaimSearchQueryType(query)));
        return this.toObservableAction('SearchClaims')(new ClaimSearchQueryType(query));
    };
}
