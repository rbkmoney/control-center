import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { findDomainObject, findDomainObjects } from './operations/utils';
import { getCreateTerminalCommit, CreateTerminalParams } from './operations';
import { toGenReference } from './converters';
import { DomainService } from './domain.service';
import { addDecisionToProviderCommit, AddDecisionToProvider } from './operations';
import { DomainCacheService } from './domain-cache.service';
import { RemoveTerminalFromShopParams } from './operations/remove-terminal-from-shop-params';
import { createRemoveTerminalFromShopCommit } from './operations/create-remove-terminal-from-shop-commit';
import { editTerminalDecisionPropertyForShopCommit } from './operations/edit-terminal-decision-property-for-shop-commit';
import { EditTerminalDecisionPropertyParams } from './operations/edit-terminal-decision-property-params';
import {
    BusinessScheduleObject,
    Domain,
    PaymentInstitutionObject,
    ProviderObject,
    TerminalObject
} from './damsel/gen-model/domain';
import { Version } from './damsel/gen-model/domain_config';

const findBusinessScheduleObjects = (domain: Domain): BusinessScheduleObject[] =>
    findDomainObjects(domain, 'business_schedule');

const findProviderObjects = (domain: Domain): ProviderObject[] =>
    findDomainObjects(domain, 'provider');

const findTerminalObjects = (domain: Domain): TerminalObject[] =>
    findDomainObjects(domain, 'terminal');

const findPaymentInstitutions = (domain: Domain): PaymentInstitutionObject[] =>
    findDomainObjects(domain, 'payment_institution');

@Injectable()
export class DomainTypedManager {
    constructor(private dmtService: DomainService, private dmtCacheService: DomainCacheService) {}

    getBusinessScheduleObjects(): Observable<BusinessScheduleObject[]> {
        return this.dmtCacheService.domain.pipe(map(domain => findBusinessScheduleObjects(domain)));
    }

    getBusinessScheduleObject(id: number): Observable<BusinessScheduleObject> {
        return this.dmtCacheService.domain.pipe(
            map(domain => findBusinessScheduleObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    getProviderObjects(): Observable<ProviderObject[]> {
        return this.dmtCacheService.domain.pipe(map(domain => findProviderObjects(domain)));
    }

    getProviderObject(id: number): Observable<ProviderObject> {
        return this.dmtCacheService.domain.pipe(
            map(domain => findProviderObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    getTerminalObjects(): Observable<TerminalObject[]> {
        return this.dmtCacheService.domain.pipe(map(domain => findTerminalObjects(domain)));
    }

    getTerminalObject(id: number): Observable<TerminalObject> {
        return this.dmtCacheService.domain.pipe(
            map(domain => findTerminalObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    editTerminalDecisionPropertyForShop(params: EditTerminalDecisionPropertyParams) {
        return combineLatest(this.getLastVersion(), this.getProviderObject(params.providerID)).pipe(
            switchMap(([version, provider]) =>
                this.dmtService.commit(
                    version,
                    editTerminalDecisionPropertyForShopCommit(provider, params)
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    removeTerminalFromShop(params: RemoveTerminalFromShopParams) {
        return combineLatest(this.getLastVersion(), this.getProviderObject(params.providerID)).pipe(
            switchMap(([version, provider]) => {
                return this.dmtService.commit(
                    version,
                    createRemoveTerminalFromShopCommit(provider, params)
                );
            }),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    createTerminal(params: CreateTerminalParams): Observable<number> {
        let newTerminalID = null;
        return combineLatest(this.getLastVersion(), this.getTerminalObjects()).pipe(
            switchMap(([version, terminalObjects]) => {
                const { commit, id } = getCreateTerminalCommit(terminalObjects, params);
                newTerminalID = id;
                return this.dmtService.commit(version, commit);
            }),
            tap(() => this.dmtCacheService.forceReload()),
            map(() => newTerminalID)
        );
    }

    addProviderDecision(params: AddDecisionToProvider): Observable<Version> {
        return combineLatest(this.getLastVersion(), this.getProviderObject(params.providerID)).pipe(
            switchMap(([version, providerObject]) =>
                this.dmtService.commit(version, addDecisionToProviderCommit(providerObject, params))
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    getLastVersion(): Observable<any> {
        return this.dmtService.checkout(toGenReference()).pipe(map(snapshot => snapshot.version));
    }

    getPaymentInstitutions(): Observable<PaymentInstitutionObject[]> {
        return this.dmtCacheService.domain.pipe(map(domain => findPaymentInstitutions(domain)));
    }
}
