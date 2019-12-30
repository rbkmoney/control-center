import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import * as Repository from './gen-nodejs/Repository';
import { ThriftService } from '../thrift-service';
import { Commit, Limit, Reference, Snapshot, Version } from './gen-model/domain_config';

@Injectable()
export class DomainService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/domain/repository', Repository);
    }

    checkout: (reference: Reference) => Observable<Snapshot> = this.toObservableAction('Checkout');

    commit: (version: Version, commit: Commit) => Observable<Version> = this.toObservableAction(
        'Commit'
    );

    pullRange: (after: Version, limit: Limit) => Observable<History> = this.toObservableAction(
        'PullRange'
    );
}
