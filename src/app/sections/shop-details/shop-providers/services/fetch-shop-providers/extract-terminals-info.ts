import get from 'lodash-es/get';
import Int64 from 'thrift-ts/lib/int64';

import { getUnionKey, getUnionValue } from '@cc/utils/get-union-key';

import {
    Condition,
    PartyID,
    Predicate,
    ShopID,
    TerminalDecision,
    TerminalObject,
    TerminalRef,
    TerminalSelector,
} from '../../../../../thrift-services/damsel/gen-model/domain';
import { findDomainObject } from '../../../../../thrift-services/damsel/operations/utils';
import {
    FlattenTerminalInfoGroup,
    PredicateInfo,
    PredicateType,
    TerminalInfo,
    TerminalInfoGroup,
} from '../../types';

function inPredicates(predicates: Set<Predicate>, shopID: ShopID, partyID: PartyID): boolean {
    for (const predicate of predicates) {
        if (extractPredicateInfo(predicate, shopID, partyID).shopPartyContain) {
            return true;
        }
    }
}

function inPartyCondition(condition: Condition, shopID: ShopID, partyID: PartyID): boolean {
    const shopIs = get(condition.party, 'definition.shop_is');
    return condition.party?.id === partyID && shopIs === shopID;
}

function isDisabled(allOf: Set<Predicate>): boolean {
    const constant = Array.from(allOf).find((pre) => pre.constant !== null);
    return constant ? constant.constant : false;
}

function extractPredicateInfo(
    predicate: Predicate,
    shopID: ShopID,
    partyID: PartyID
): PredicateInfo {
    const v = getUnionValue(predicate);
    switch (getUnionKey(predicate)) {
        case 'all_of':
            return {
                shopPartyContain: inPredicates(v as Set<Predicate>, shopID, partyID),
                predicateType: PredicateType.AllOf,
                disabled: isDisabled(v as Set<Predicate>),
            };
        case 'any_of':
            return {
                shopPartyContain: inPredicates(v as Set<Predicate>, shopID, partyID),
                predicateType: PredicateType.AnyOf,
                disabled: false,
            };
        case 'is_not':
            return extractPredicateInfo(v as Predicate, shopID, partyID);
        case 'condition':
            if (getUnionKey(v as Condition) === 'payment_tool') {
                break;
            }
            return {
                shopPartyContain: inPartyCondition(v as Condition, shopID, partyID),
                predicateType: PredicateType.Condition,
                disabled: false,
            };
    }
    return {
        shopPartyContain: false,
    };
}

const extractIdsFromValue = (value: TerminalRef[]): number[] => value.map((v) => v.id);

function extractIdsFromDecisions(decisions: TerminalDecision[]): number[] {
    return decisions.reduce((r, { then_ }) => {
        if (then_.decisions) {
            r = r.concat(extractIdsFromDecisions(then_.decisions));
        }
        if (then_.value) {
            r = r.concat(extractIdsFromValue(Array.from(then_.value)));
        }
        return r;
    }, []);
}

function extractIds({ decisions, value }: TerminalSelector): number[] {
    if (decisions) {
        return extractIdsFromDecisions(decisions);
    }
    if (value) {
        return extractIdsFromValue(Array.from(value));
    }
}

function extractWeights({ value }: TerminalSelector): Int64[] {
    if (value) {
        return Array.from(value).map(({ weight }) => weight);
    }
}

function extractPriorities({ value }: TerminalSelector): Int64[] {
    if (value) {
        return Array.from(value).map(({ priority }) => priority);
    }
}

const extractTerminalsInfoGroup = (
    decisions: TerminalDecision[],
    shopID: ShopID,
    partyID: PartyID
): TerminalInfoGroup[] =>
    decisions.reduce((r, { if_, then_ }) => {
        const { shopPartyContain, disabled, predicateType } = extractPredicateInfo(
            if_,
            shopID,
            partyID
        );
        if (shopPartyContain) {
            r = r.concat({
                terminalIds: extractIds(then_),
                disabled,
                predicateType,
                weights: extractWeights(then_),
                priorities: extractPriorities(then_),
            });
        }
        return r;
    }, []);

const flattenGroup = (group: TerminalInfoGroup[]): FlattenTerminalInfoGroup[] =>
    group.reduce(
        (r, { terminalIds, disabled, predicateType, weights, priorities }) => [
            ...r,
            ...terminalIds.map((terminalId, idx) => ({
                terminalId,
                disabled,
                predicateType,
                weight: weights[idx],
                priority: priorities[idx],
            })),
        ],
        []
    );

const enrichWithTerminal = (
    groups: FlattenTerminalInfoGroup[],
    terminalObjects: TerminalObject[]
): TerminalInfo[] =>
    groups.map((group) => ({
        terminal: findDomainObject(terminalObjects, group.terminalId),
        disabled: group.disabled,
        predicateType: group.predicateType,
        weight: group.weight,
        priority: group.priority,
    }));

export function extractTerminalsInfo(
    decisions: TerminalDecision[],
    terminalObjects: TerminalObject[],
    shopID: ShopID,
    partyID: PartyID
): TerminalInfo[] {
    const extractedGroup = extractTerminalsInfoGroup(decisions, shopID, partyID);
    return enrichWithTerminal(flattenGroup(extractedGroup), terminalObjects);
}
