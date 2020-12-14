import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { DomainCacheService } from './domain-cache.service';
import { DomainService } from './domain.service';
import { Version } from './gen-model/domain_config';
import {
    AddDecisionToProvider,
    addDecisionToProviderCommit,
    CreateTerminalParams,
    getCreateTerminalCommit,
} from './operations';
import { createRemoveTerminalFromShopCommit } from './operations/create-remove-terminal-from-shop-commit';
import { editTerminalDecisionPropertyForShopCommit } from './operations/edit-terminal-decision-property-for-shop-commit';
import { EditTerminalDecisionPropertyParams } from './operations/edit-terminal-decision-property-params';
import { RemoveTerminalFromShopParams } from './operations/remove-terminal-from-shop-params';

/**
 * @deprecated should be removed, use DomainCacheService
 * CREATE SEPARATE SERVICES FOR EACH DOMAIN OBJECT
 */
@Injectable()
export class DomainTypedManager {
    constructor(
        private dmtService: DomainService,
        private domainCacheService: DomainCacheService
    ) {}

    /**
     * @deprecated select in separate service
     */
    editTerminalDecisionPropertyForShop(params: EditTerminalDecisionPropertyParams) {
        return this.domainCacheService.getObjects('provider').pipe(
            map((providerObject) => providerObject.find((obj) => obj.ref.id === params.providerID)),
            switchMap((provider) =>
                this.domainCacheService.commit(
                    editTerminalDecisionPropertyForShopCommit(provider, params)
                )
            ),
            tap(() => this.domainCacheService.forceReload())
        );
    }

    /**
     * @deprecated select in separate service
     */
    removeTerminalFromShop(params: RemoveTerminalFromShopParams) {
        return combineLatest([
            this.domainCacheService.version$,
            this.domainCacheService
                .getObjects('provider')
                .pipe(
                    map((providerObject) =>
                        providerObject.find((obj) => obj.ref.id === params.providerID)
                    )
                ),
        ]).pipe(
            switchMap(([version, provider]) => {
                return this.dmtService.commit(
                    version,
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
        return combineLatest([
            this.domainCacheService.version$,
            this.domainCacheService.getObjects('terminal'),
        ]).pipe(
            take(1),
            switchMap(([version, terminalObjects]) => {
                const { commit, id } = getCreateTerminalCommit(terminalObjects, params);
                newTerminalID = id;
                return this.dmtService.commit(version, commit);
            }),
            tap(() => this.domainCacheService.forceReload()),
            map(() => newTerminalID)
        );
    }

    /**
     * @deprecated select in separate service
     */
    addProviderDecision(params: AddDecisionToProvider): Observable<Version> {
        return combineLatest([
            this.domainCacheService.version$,
            this.domainCacheService
                .getObjects('provider')
                .pipe(
                    map((providerObject) =>
                        providerObject.find((obj) => obj.ref.id === params.providerID)
                    )
                ),
        ]).pipe(
            switchMap(([version, providerObject]) =>
                this.dmtService.commit(version, addDecisionToProviderCommit(providerObject, params))
            ),
            tap(() => this.domainCacheService.forceReload())
        );
    }
}
