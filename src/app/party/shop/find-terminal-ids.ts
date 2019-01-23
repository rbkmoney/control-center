import { Condition, Predicate, TerminalRef } from '../../gen-damsel/domain';
import get from 'lodash-es/get';

function inPredicates(predicates: Predicate[], shopID: string, partyID: string): boolean {
    for (const predicate of predicates) {
        if (hasShopAndParty(predicate, shopID, partyID)) {
            return true;
        }
    }
}

function inPartyCondition({ party }: Condition, shopID: string, partyID: string): boolean {
    const shopIs = get(party, 'definition.shop_is');
    return party.id === partyID && shopIs === shopID;
}

// Need Predicate in snake_case
function hasShopAndParty(
    { all_of, any_of, condition }: any,
    shopID: string,
    partyID: string
): boolean {
    if (all_of && all_of.length > 0) {
        return inPredicates(all_of, shopID, partyID);
    }
    if (any_of && any_of.length > 0) {
        return inPredicates(any_of, shopID, partyID);
    }
    if (condition && condition.party) {
        return inPartyCondition(condition, shopID, partyID);
    }
    return false;
}

function extractIdsFromValue(value: TerminalRef[]): number[] {
    return value.map(v => v.id);
}

// Need TerminalDecision with if_ then_
function extractIdsFromDecisions(decisions: any[]): number[] {
    return decisions.reduce((r, { then_ }) => {
        if (then_.decisions) {
            r = r.concat(extractIdsFromDecisions(then_.decisions));
        }
        if (then_.value) {
            r = r.concat(extractIdsFromValue(then_.value));
        }
        return r;
    }, []);
}

// Need TerminalSelector with Array instead Set
function extractIds({ decisions, value }: any): number[] {
    if (decisions) {
        return extractIdsFromDecisions(decisions);
    }
    if (value) {
        return extractIdsFromValue(value);
    }
}

// Need TerminalDecision with if_ then_
export function findTerminalIds(decisions: any[], shopID: string, partyID: string): number[] {
    return decisions.reduce((r, { if_, then_ }) => {
        if (hasShopAndParty(if_, shopID, partyID)) {
            r = r.concat(extractIds(then_));
        }
        return r;
    }, []);
}
