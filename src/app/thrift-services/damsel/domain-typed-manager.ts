import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { DomainCacheService } from './domain-cache.service';
import { ProviderObject } from './gen-model/domain';
import { Version } from './gen-model/domain_config';
import {
    AddDecisionToProvider,
    addDecisionToProviderCommit,
    CreateTerminalParams,
    getCreateTerminalCommit,
} from './operations';
import { findDomainObject } from './operations/utils';

@Injectable()
export class DomainTypedManager {
    constructor(private domainCacheService: DomainCacheService) {}

    getProviderFromParams<T extends { providerID: number }>(
        p: T
    ): Observable<readonly [T, ProviderObject]> {
        return combineLatest([of(p), this.domainCacheService.getObjects('provider')]).pipe(
            map(
                ([params, providerObject]) =>
                    [
                        params,
                        findDomainObject(providerObject as ProviderObject[], params.providerID),
                    ] as const
            )
        );
    }

    /**
     * @deprecated select in separate service
     */
    createTerminal(params: CreateTerminalParams): Observable<number> {
        let newTerminalID = null;
        return this.domainCacheService.getObjects('terminal').pipe(
            take(1),
            switchMap((terminalObjects) => {
                const { commit, id } = getCreateTerminalCommit(terminalObjects, params);
                newTerminalID = id;
                return this.domainCacheService.commit(commit);
            }),
            tap(() => this.domainCacheService.forceReload()),
            map(() => newTerminalID)
        );
    }

    /**
     * @deprecated select in separate service
     */
    addProviderDecision(params: AddDecisionToProvider): Observable<Version> {
        return this.domainCacheService.getObjects('provider').pipe(
            map((providerObject) => providerObject.find((obj) => obj.ref.id === params.providerID)),
            switchMap((providerObject) =>
                this.domainCacheService.commit(addDecisionToProviderCommit(providerObject, params))
            ),
            tap(() => this.domainCacheService.forceReload())
        );
    }
}
