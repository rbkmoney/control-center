import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { DomainTypedManager } from '../domain-typed-manager';
import { DomainService } from '../domain.service';
import { Domain, PaymentRoutingDelegate, PaymentRoutingRulesObject } from '../gen-model/domain';
import { Version } from '../gen-model/domain_config';
import { findDomainObjects } from '../operations/utils';
import { partyRulesetCommit } from './party-ruleset-commit';
import { shopRulesetCommit } from './shop-ruleset-commit copy';

const MAIN_RULESET_NAME = 'Main ruleset';

const findPaymentRoutingRulesObjects = (domain: Domain): PaymentRoutingRulesObject[] =>
    findDomainObjects(domain, 'payment_routing_rules');

const sortPaymentRoutingRulesObjects = (
    objs: PaymentRoutingRulesObject[]
): PaymentRoutingRulesObject[] => objs.sort((a, b) => a.ref.id - b.ref.id);

const findMainRuleset = (objs: PaymentRoutingRulesObject[]): PaymentRoutingRulesObject =>
    objs.find((o) => o?.data?.name === MAIN_RULESET_NAME);

const findPartyDelegate = (mainRuleset: PaymentRoutingRulesObject, partyID: string) =>
    mainRuleset.data.decisions.delegates.find((d) => d?.allowed?.condition?.party?.id === partyID);

const findRulesetByDelegate = (
    rulesets: PaymentRoutingRulesObject[],
    delgeate: PaymentRoutingDelegate
) => rulesets.find((r) => r.ref.id === delgeate.ruleset.id);

@Injectable()
export class PaymentRoutingRulesService {
    constructor(
        private dmtService: DomainService,
        private dmtCacheService: DomainCacheService,
        private domainTypedManager: DomainTypedManager
    ) {}

    getRulesets(): Observable<PaymentRoutingRulesObject[]> {
        return this.dmtCacheService.domain.pipe(
            map(findPaymentRoutingRulesObjects),
            map(sortPaymentRoutingRulesObjects)
        );
    }

    getMainRuleset(): Observable<PaymentRoutingRulesObject> {
        return this.getRulesets().pipe(map(findMainRuleset));
    }

    getPartyDelegate(partyID: string): Observable<PaymentRoutingDelegate> {
        return this.getMainRuleset().pipe(
            map((mainRuleset) => findPartyDelegate(mainRuleset, partyID))
        );
    }

    getPartyRuleset(partyID: string): Observable<PaymentRoutingRulesObject> {
        return this.getPartyDelegate(partyID).pipe(
            withLatestFrom(this.getRulesets()),
            map(([partyDelegate, rulesets]) => findRulesetByDelegate(rulesets, partyDelegate))
        );
    }

    addPartyRuleset(params: {
        name: string;
        partyID: string;
        description?: string;
        delegateDescription?: string;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.getRulesets(),
            this.getMainRuleset(),
        ]).pipe(
            take(1),
            switchMap(([version, paymentRoutingRulesObjects, mainRuleset]) =>
                this.dmtService.commit(
                    version,
                    partyRulesetCommit({
                        mainRuleset,
                        paymentRoutingRulesObjects,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    addShopRuleset(params: {
        name: string;
        shopID: string;
        partyID: string;
        description?: string;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.getRulesets(),
            this.getPartyRuleset(params.partyID),
        ]).pipe(
            take(1),
            switchMap(([version, paymentRoutingRulesObjects, partyRuleset]) =>
                this.dmtService.commit(
                    version,
                    shopRulesetCommit({
                        partyRuleset,
                        paymentRoutingRulesObjects,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }
}
