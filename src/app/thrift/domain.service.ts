import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as Repository from './gen-nodejs/Repository';
import { ThriftService } from './thrift-service';

@Injectable()
export class DomainService extends ThriftService {

    constructor(zone: NgZone) {
        super(zone, '/v1/domain/repository', Repository);
    }

    checkout: (reference: any) => Observable<any> = this.toObservableAction('Checkout');

    commit: (version: any, commit: any) => Observable<any> = this.toObservableAction('Commit');
}
