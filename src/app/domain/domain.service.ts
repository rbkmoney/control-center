import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { toGenReference } from '../thrift/converters/to-gen-reference';
import { Snapshot } from '../gen-damsel/domain_config';
import { Reference, DomainObject } from '../gen-damsel/domain';
import { clearNullFields } from '../shared/thrift-utils';

@Injectable()
export class DomainService {
    private shapshot: Snapshot;

    constructor(private thriftDomainService: ThriftDomainService) {}

    getDomainObject(ref: Reference): Observable<DomainObject | null> {
        return this.checkoutHead().pipe(
            map(({ domain }) => {
                const searchRef = JSON.stringify(ref);
                for (const [k, v] of domain) {
                    const domainRef = JSON.stringify(clearNullFields(k));
                    if (domainRef === searchRef) {
                        return v;
                    }
                }
                return null;
            })
        );
    }

    checkoutHead(): Observable<Snapshot> {
        if (this.shapshot) {
            return Observable.create(obs => {
                obs.next(this.shapshot);
                obs.complete();
            });
        }
        return this.thriftDomainService
            .checkout(toGenReference())
            .pipe(tap(s => (this.shapshot = s)));
    }
}
