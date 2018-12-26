import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { toGenReference } from '../thrift/converters/to-gen-reference';
import { Snapshot } from '../gen-damsel/domain_config';
import { tap } from 'rxjs/operators';

@Injectable()
export class DomainService {
    constructor(private thriftDomainService: ThriftDomainService) {}

    snapshot$: Subject<Snapshot> = new BehaviorSubject(null);

    checkoutHead(): Observable<Snapshot> {
        return this.thriftDomainService
            .checkout(toGenReference())
            .pipe(tap(s => this.snapshot$.next(s)));
    }
}
