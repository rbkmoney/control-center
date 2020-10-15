import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { getUnionKey } from '@cc/utils/index';

import { toGenReference } from '../converters';
import { createDamselInstance, damselInstanceToObject } from './create-damsel-instance';
import { DomainService } from './domain.service';
import { DomainObject } from './gen-model/domain';
import { Commit, Version } from './gen-model/domain_config';

@Injectable()
export class DomainCacheService {
    private reload$ = new ReplaySubject(1);

    constructor(private dmtService: DomainService) {}

    private snapshot = this.reload$.pipe(
        startWith(undefined),
        switchMap(() => this.dmtService.checkout(toGenReference())),
        shareReplay(1)
    );
    /**
     * @deprecated use domain$
     */
    domain = this.snapshot.pipe(pluck('domain'), shareReplay(1));

    snapshot$ = this.snapshot.pipe(
        map((s) => damselInstanceToObject('domain_config', 'Snapshot', s)),
        shareReplay(1)
    );
    domain$ = this.snapshot$.pipe(pluck('domain'));
    version$ = this.snapshot$.pipe(pluck('version'));

    forceReload() {
        this.reload$.next();
    }

    getObjects = <T extends keyof DomainObject>(objectType: T): Observable<DomainObject[T][]> =>
        this.domain$.pipe(
            map((d) =>
                Array.from(d.values())
                    .filter((o) => getUnionKey(o) === objectType)
                    .map((o) => o[objectType])
            )
        );

    commit = (commit: Commit, version?: Version) => {
        return (version ? of(version) : this.version$).pipe(
            switchMap((v) =>
                this.dmtService.commit(
                    createDamselInstance('domain_config', 'Version', v),
                    createDamselInstance('domain_config', 'Commit', commit)
                )
            ),
            map((v) => damselInstanceToObject('domain_config', 'Version', v)),
            tap(() => this.forceReload())
        );
    };
}
