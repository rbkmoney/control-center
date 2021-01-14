import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { map, pluck, share, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

import { getUnionKey } from '@cc/utils/get-union-key';

import { toGenReference } from '../converters';
import { DomainService } from './domain.service';
import { Domain, DomainObject } from './gen-model/domain';
import { Commit, Snapshot, Version } from './gen-model/domain_config';
import { createDamselInstance, damselInstanceToObject } from './utils/create-damsel-instance';

@UntilDestroy()
@Injectable()
export class DomainCacheService {
    /**
     * @deprecated use domain$
     */
    domain: Observable<Domain>;
    snapshot$: Observable<Snapshot>;
    domain$: Observable<Domain>;
    version$: Observable<number>;
    get isLoading$(): Observable<boolean> {
        return this._isLoading$.asObservable();
    }

    private reload$ = new ReplaySubject(1);
    private snapshot = this.reload$.pipe(
        startWith(undefined),
        tap(() => this._isLoading$.next(true)),
        switchMap(() => this.dmtService.checkout(toGenReference())),
        tap(() => this._isLoading$.next(false)),
        shareReplay(1)
    );
    private _isLoading$ = new BehaviorSubject(true);

    constructor(private dmtService: DomainService) {
        this.domain$ = this.snapshot.pipe(pluck('domain'), shareReplay(1));
        this.snapshot$ = this.snapshot.pipe(
            map((s) => damselInstanceToObject('domain_config', 'Snapshot', s)),
            shareReplay(1)
        );
        this.domain$ = this.snapshot$.pipe(pluck('domain'));
        this.version$ = this.snapshot$.pipe(pluck('version')) as Observable<any>;

        this.snapshot.pipe(untilDestroyed(this)).subscribe();
    }

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

    commit = (commit: Commit, version?: Version | number) => {
        return (version ? of(version) : this.version$).pipe(
            take(1),
            switchMap((v) =>
                this.dmtService.commit(
                    createDamselInstance('domain_config', 'Version', v as Version),
                    createDamselInstance('domain_config', 'Commit', commit)
                )
            ),
            map((v) => damselInstanceToObject('domain_config', 'Version', v)),
            tap(() => this.forceReload()),
            share()
        );
    };
}
