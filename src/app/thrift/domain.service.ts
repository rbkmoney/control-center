import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as Repository from './gen-nodejs/Repository';
import { ThriftService } from './thrift-service';
import { Snapshot, Reference, Version, Commit, Limit } from '../gen-damsel/domain_config';
import * as DomainConfigTypes from './gen-nodejs/domain_config_types';

@Injectable()
export class DomainService extends ThriftService {

    constructor(zone: NgZone) {
        super(zone, '/v1/domain/repository', Repository);
    }

    commit: (version: Version, commit: Commit) => Observable<Version> = this.toObservableAction('Commit');

    pullRange: (after: Version, limit: Limit) => Observable<History> = this.toObservableAction('PullRange');

    pull: (version: Version) => Observable<History> = this.toObservableAction('Pull');

    checkout = (reference: Reference): Observable<Snapshot> => this.toObservableAction('Checkout')(new DomainConfigTypes.Reference(reference));
}
