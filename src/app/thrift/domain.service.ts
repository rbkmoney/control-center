import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as Repository from './gen-nodejs/Repository';
import { ThriftService } from './thrift-service';
import { Reference, Snapshot, Commit, Version, Limit } from '../gen-damsel/domain_config';

@Injectable()
export class DomainService extends ThriftService {
    constructor(zone: NgZone) {
        super(zone, '/v1/domain/repository', Repository);
    }

    checkout: (reference: Reference) => Observable<Snapshot> = this.toObservableAction('Checkout');

    commit: (version: any, commit: Commit) => Observable<any> = this.toObservableAction('Commit');

    pullRange: (after: Version, limit: Limit) => Observable<History> = this.toObservableAction(
        'PullRange'
    );
}
