import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { getUnionKey } from '@cc/utils/index';

import { toGenReference } from '../converters';
import { damselInstanceToObject } from './create-damsel-instance';
import { DomainService } from './domain.service';
import { DomainObject } from './gen-model/domain';

@Injectable()
export class DomainCacheService {
    private reload$ = new ReplaySubject(1);

    constructor(private dmtService: DomainService) {}

    /**
     * @deprecated
     */
    domain = this.reload$.pipe(
        startWith(undefined),
        switchMap(() => this.dmtService.checkout(toGenReference())),
        pluck('domain'),
        shareReplay(1)
    );

    domainObject = this.domain.pipe(
        map((d) => damselInstanceToObject('domain', 'Domain', d)),
        shareReplay(1)
    );

    forceReload() {
        this.reload$.next();
    }

    getObject<T extends keyof DomainObject>(objectType: T): Observable<DomainObject[T][]> {
        return this.domainObject.pipe(
            map((d) =>
                Array.from(d.values())
                    .filter((o) => getUnionKey(o) === objectType)
                    .map((o) => o[objectType])
            )
        );
    }
}
