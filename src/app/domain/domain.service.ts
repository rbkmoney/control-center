import { Injectable } from '@angular/core';
import { toJson } from '@cc/utils/thrift-json-converter';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { toGenCommit, toGenReference } from '../thrift-services/converters';
import { DomainService as ThriftDomainService } from '../thrift-services/damsel/domain.service';
import { DomainObject, Reference } from '../thrift-services/damsel/gen-model/domain';
import { Commit, Snapshot } from '../thrift-services/damsel/gen-model/domain_config';

/**
 * @deprecated duplicates thrift-services/damsel/domain-cache.service
 */
@Injectable()
export class DomainService {
    private shapshot$: Observable<Snapshot>;

    constructor(private thriftDomainService: ThriftDomainService) {
        this.updateSnapshot();
    }

    /**
     * @deprecated use DomainCacheService -> snapshot$
     */
    get shapshot() {
        return this.shapshot$;
    }

    /**
     * @deprecated use DomainCacheService -> version$
     */
    get version$(): Observable<number> {
        return this.shapshot$.pipe(
            map(({ version }) => (version ? version.toNumber() : undefined))
        );
    }

    /**
     * @deprecated use DomainCacheService -> getObjects or specific service from thrift-services/damsel
     */
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

    /**
     * @deprecated use DomainCacheService -> forceReload()
     */
    updateSnapshot() {
        return (this.shapshot$ = this.thriftDomainService.checkout(toGenReference()));
    }

    /**
     * @deprecated use DomainCacheService -> commit()
     */
    commit(commit: Commit) {
        return this.shapshot$.pipe(
            switchMap(({ version }) =>
                this.thriftDomainService.commit(version, toGenCommit(commit))
            )
        );
    }
}
