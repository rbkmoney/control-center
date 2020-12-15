import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { DomainCacheService } from './domain-cache.service';
import { Version } from './gen-model/domain_config';
import {
    AddDecisionToProvider,
    addDecisionToProviderCommit,
    CreateTerminalParams,
    getCreateTerminalCommit,
} from './operations';
import { createRemoveTerminalFromShopCommit } from './operations/create-remove-terminal-from-shop-commit';
import { RemoveTerminalFromShopParams } from './operations/remove-terminal-from-shop-params';

/**
 * @deprecated should be removed, use DomainCacheService
 * CREATE SEPARATE SERVICES FOR EACH DOMAIN OBJECT
 */
@Injectable()
export class DomainTypedManager {
    constructor(private domainCacheService: DomainCacheService) {}

    /**
     * @deprecated select in separate service
     */
    removeTerminalFromShop(params: RemoveTerminalFromShopParams) {
        return this.domainCacheService.getObjects('provider').pipe(
            map((providerObject) => providerObject.find((obj) => obj.ref.id === params.providerID)),
            switchMap((provider) => {
                return this.domainCacheService.commit(
                    createRemoveTerminalFromShopCommit(provider, params)
                );
            }),
            tap(() => this.domainCacheService.forceReload())
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
