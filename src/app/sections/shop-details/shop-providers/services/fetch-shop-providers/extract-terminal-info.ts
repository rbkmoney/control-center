import get from 'lodash-es/get';
import Int64 from 'thrift-ts/lib/int64';

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
import {
    FlattenTerminalInfoGroup,
    PredicateInfo,
    TerminalInfo,
    TerminalInfoGroup,
} from '../../types';
import { PredicateType } from '../../types/predicate-type';

function inPredicates(predicates: Set<Predicate>, shopID: ShopID, partyID: PartyID): boolean {
    for (const predicate of predicates) {
        if (extractPredicateInfo(predicate, shopID, partyID).shopPartyContain) {
            return true;
        }
    }
}

function inPartyCondition({ party }: Condition, shopID: ShopID, partyID: PartyID): boolean {
    const shopIs = get(party, 'definition.shop_is');
    return party.id === partyID && shopIs === shopID;
}

function isDisabled(all_of: Set<Predicate>): boolean {
    const constant = Array.from(all_of).find((pre) => pre.constant !== null);
    return !!constant ? constant.constant : false;
}

function extractPredicateInfo(
    { all_of, any_of, condition, is_not }: Predicate,
    shopID: ShopID,
    partyID: PartyID
): PredicateInfo {
    if (all_of && all_of.size > 0) {
        return {
            shopPartyContain: inPredicates(all_of, shopID, partyID),
            predicateType: PredicateType.all_of,
            disabled: isDisabled(all_of),
        };
    }
    if (any_of && any_of.size > 0) {
        return {
            shopPartyContain: inPredicates(any_of, shopID, partyID),
            predicateType: PredicateType.any_of,
            disabled: false,
        };
    }
    if (is_not) {
        return {
            shopPartyContain: inPartyCondition(is_not.condition, shopID, partyID),
            predicateType: PredicateType.is_not,
            disabled: true,
        };
    }
    if (condition && condition.party) {
        return {
            shopPartyContain: inPartyCondition(condition, shopID, partyID),
            predicateType: PredicateType.condition,
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

const extractTerminalInfoGroup = (
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
): TerminalInfo[] => {
    return groups.map((group) => {
        return {
            terminal: terminalObjects.find(({ ref: { id } }) => group.terminalId === id),
            disabled: group.disabled,
            predicateType: group.predicateType,
            weight: group.weight,
            priority: group.priority,
        };
    });
};

export function extractTerminalInfo(
    decisions: TerminalDecision[],
    terminalObjects: TerminalObject[],
    shopID: ShopID,
    partyID: PartyID
): TerminalInfo[] {
    const extractedGroup = extractTerminalInfoGroup(decisions, shopID, partyID);
    return enrichWithTerminal(flattenGroup(extractedGroup), terminalObjects);
}
