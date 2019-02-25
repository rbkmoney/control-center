import { Condition, Predicate, TerminalRef } from '../../gen-damsel/domain';
import { TerminalObject } from '../../damsel/domain';
import get from 'lodash-es/get';

export class TerminalInfo {
    terminals: TerminalObject[];
    isActive: boolean;
}

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

// Get active status
function isActive(if_: any): boolean {
    const { all_of } = if_;
    if (all_of && all_of.length > 0) {
        const predicate = all_of.find(pre => pre.constant !== null);
        return predicate ? predicate.constant : true;
    }
    return true;
}

// Need TerminalDecision with if_ then_
export function findTerminalInfos(
    decisions: any[],
    terminalObjects: TerminalObject[],
    shopID: string,
    partyID: string
): TerminalInfo[] {
    return decisions.reduce((r, { if_, then_ }) => {
        if (hasShopAndParty(if_, shopID, partyID)) {
            r = r.concat({
                terminals: extractIds(then_).map(terminalId =>
                    terminalObjects.find(({ ref: { id } }) => id === terminalId)
                ),
                isActive: isActive(if_)
            });
        }
        return r;
    }, []);
}
