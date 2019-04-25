import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { DomainService as ThriftDomainService } from '../thrift/domain.service';
import { toGenReference, toGenCommit } from '../thrift/converters';
import { Snapshot, Commit } from '../gen-damsel/domain_config';
import { Reference, DomainObject } from '../gen-damsel/domain';
import { toJson } from '../shared/thrift-json-converter';

@Injectable()
export class DomainService {
    private shapshot$: Observable<Snapshot>;

    constructor(private thriftDomainService: ThriftDomainService) {
        this.shapshot$ = this.thriftDomainService.checkout(toGenReference());
    }

    get shapshot() {
        return this.shapshot$;
    }

    getDomainObject(ref: Reference): Observable<DomainObject | null> {
        return this.shapshot$.pipe(
            map(({ domain }) => {
                const searchRef = JSON.stringify(ref);
                for (const [k, v] of domain) {
                    const domainRef = JSON.stringify(toJson(k));
                    if (domainRef === searchRef) {
                        return v;
                    }
                }
                return null;
            })
        );
    }

    commit(commit: Commit) {
        return this.shapshot$.pipe(
            switchMap(({ version }) =>
                this.thriftDomainService.commit(version, toGenCommit(commit))
            )
        );
    }
}
