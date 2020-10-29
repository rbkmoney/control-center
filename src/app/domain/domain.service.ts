import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { toJson } from '@cc/utils/index';

import { toGenCommit, toGenReference } from '../thrift-services/converters';
import { DomainService as ThriftDomainService } from '../thrift-services/damsel/domain.service';
import { DomainObject, Reference } from '../thrift-services/damsel/gen-model/domain';
import { Commit, Snapshot } from '../thrift-services/damsel/gen-model/domain_config';

@Injectable()
export class DomainService {
    private shapshot$: Observable<Snapshot>;

    constructor(private thriftDomainService: ThriftDomainService) {
        this.updateSnapshot();
    }

    get shapshot() {
        return this.shapshot$;
    }

    get version$(): Observable<number> {
        return this.shapshot$.pipe(
            map(({ version }) => (version ? version.toNumber() : undefined))
        );
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

    updateSnapshot() {
        return (this.shapshot$ = this.thriftDomainService.checkout(toGenReference()));
    }

    commit(commit: Commit) {
        return this.shapshot$.pipe(
            switchMap(({ version }) =>
                this.thriftDomainService.commit(version, toGenCommit(commit))
            )
        );
    }
}
