import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { DomainTypedManager } from '../domain-typed-manager';
import { DomainService } from '../domain.service';
import { Domain, PaymentRoutingRulesObject } from '../gen-model/domain';
import { Version } from '../gen-model/domain_config';
import { findDomainObjects } from '../operations/utils';
import { addPartyDelegateCommit } from './add-party-delegate-commit';

const findPaymentRoutingRulesObjects = (domain: Domain): PaymentRoutingRulesObject[] =>
    findDomainObjects(domain, 'payment_routing_rules');

const findMainRuleset = (objs: PaymentRoutingRulesObject[]): PaymentRoutingRulesObject =>
    objs.find((o) => o?.data?.name === 'Main ruleset');

@Injectable()
export class PaymentRoutingRulesService {
    constructor(
        private dmtService: DomainService,
        private dmtCacheService: DomainCacheService,
        private domainTypedManager: DomainTypedManager
    ) {}

    getRulesets(): Observable<PaymentRoutingRulesObject[]> {
        return this.dmtCacheService.domain.pipe(map(findPaymentRoutingRulesObjects));
    }

    getMainRuleset(): Observable<PaymentRoutingRulesObject> {
        return this.getRulesets().pipe(map(findMainRuleset));
    }

    addPartyDelegate(params: {
        name: string;
        partyID: string;
        description?: string;
        delegateDescription?: string;
    }): Observable<Version> {
        return combineLatest([this.domainTypedManager.getLastVersion(), this.getRulesets()]).pipe(
            switchMap(([version, paymentRoutingRulesObjects]) =>
                this.dmtService.commit(
                    version,
                    addPartyDelegateCommit({
                        mainRuleset: findMainRuleset(paymentRoutingRulesObjects),
                        paymentRoutingRulesObjects,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }
}
