import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { DomainTypedManager } from '../domain-typed-manager';
import { DomainService } from '../domain.service';
import {
    Domain,
    PaymentRoutingDelegate,
    PaymentRoutingRulesObject,
    Predicate,
} from '../gen-model/domain';
import { Version } from '../gen-model/domain_config';
import { findDomainObjects, generateID } from '../operations/utils';
import { partyRulesetCommit } from './party-ruleset-commit';
import { removeShopRuleCommit } from './remove-shop-rule-commit';
import { shopRuleCommit } from './shop-rule-commit';
import { shopRulesetCommit } from './shop-ruleset-commit';

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

const findShopDelegate = (partyRuleset: PaymentRoutingRulesObject, refID: number) =>
    partyRuleset.data.decisions.delegates.find((d) => d?.ruleset?.id === refID);

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

    getShopDelegate(partyID: string, refID: number): Observable<PaymentRoutingDelegate> {
        return this.getPartyRuleset(partyID).pipe(
            map((partyRuleset) => findShopDelegate(partyRuleset, refID))
        );
    }

    getPartyRuleset(partyID: string): Observable<PaymentRoutingRulesObject> {
        return combineLatest([this.getPartyDelegate(partyID), this.getRulesets()]).pipe(
            map(([partyDelegate, rulesets]) => findRulesetByDelegate(rulesets, partyDelegate))
        );
    }

    getShopRuleset(partyID: string, refID: number): Observable<PaymentRoutingRulesObject> {
        return combineLatest([this.getShopDelegate(partyID, refID), this.getRulesets()]).pipe(
            map(([shopDelegate, rulesets]) => findRulesetByDelegate(rulesets, shopDelegate))
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

    addShopRule({
        refID,
        partyID,
        ...params
    }: {
        partyID: string;
        refID: number;
        terminalID: number;
        description: string;
        weight: number;
        priority: number;
        predicate: Predicate;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.getShopRuleset(partyID, refID),
        ]).pipe(
            take(1),
            switchMap(([version, shopRuleset]) =>
                this.dmtService.commit(
                    version,
                    shopRuleCommit({
                        shopRuleset,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    removeShopRule({
        refID,
        partyID,
        candidateIdx,
    }: {
        partyID: string;
        refID: number;
        candidateIdx: number;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.getShopRuleset(partyID, refID),
        ]).pipe(
            take(1),
            switchMap(([version, shopRuleset]) =>
                this.dmtService.commit(
                    version,
                    removeShopRuleCommit({
                        shopRuleset,
                        candidateIdx,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    attachPartyDelegateRuleset({
        mainRulesetRefID,
        partyID,
        mainDelegateDescription,
        ruleset: { name, description },
    }: {
        mainRulesetRefID: number;
        partyID: string;
        mainDelegateDescription?: string;
        ruleset: { name: string; description?: string };
    }): Observable<Version> {
        return this.dmtCacheService.getObjects('payment_routing_rules').pipe(
            take(1),
            switchMap((rulesets) => {
                const mainRuleset = rulesets.find((r) => r?.ref?.id === mainRulesetRefID);
                const rulesetID = generateID(rulesets);
                const newMainPaymentRoutingRuleset = cloneDeep(mainRuleset);
                if (!newMainPaymentRoutingRuleset.data.decisions.delegates) {
                    newMainPaymentRoutingRuleset.data.decisions.delegates = [];
                }
                newMainPaymentRoutingRuleset.data.decisions.delegates.push({
                    description: mainDelegateDescription,
                    allowed: {
                        condition: {
                            party: { id: partyID },
                        },
                    },
                    ruleset: {
                        id: rulesetID,
                    },
                });
                const ruleset: PaymentRoutingRulesObject = {
                    ref: { id: rulesetID },
                    data: {
                        name,
                        description,
                        decisions: { delegates: [] },
                    },
                };
                console.log(ruleset, newMainPaymentRoutingRuleset);
                return this.dmtCacheService.commit({
                    ops: [
                        {
                            insert: { object: { payment_routing_rules: ruleset } },
                        },
                        {
                            update: {
                                old_object: { payment_routing_rules: mainRuleset },
                                new_object: { payment_routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }
}
