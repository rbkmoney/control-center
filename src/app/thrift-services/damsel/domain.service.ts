import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import { Commit, Limit, Reference, Snapshot, Version } from './gen-model/domain_config';
import * as Repository from './gen-nodejs/Repository';

@Injectable()
export class DomainService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/domain/repository', Repository);
    }

    checkout: (reference: Reference) => Observable<Snapshot> = this.toObservableAction('Checkout', false);

    commit: (version: Version, commit: Commit) => Observable<Version> = this.toObservableAction(
        'Commit', false
    );

    pullRange: (after: Version, limit: Limit) => Observable<History> = this.toObservableAction(
        'PullRange', false
    );
}
