import get from 'lodash-es/get';

import { Condition, Predicate, TerminalRef } from '../../gen-damsel/domain';

interface PredicateInfo {
    shopPartyContain: boolean;
    predicateType?: PredicateType;
    disabled?: boolean;
}

interface TerminalInfoGroup {
    terminalIds: number[];
    disabled: boolean;
    predicateType: PredicateType;
}

export enum PredicateType {
    condition = 'condition',
    is_not = 'is_not',
    all_of = 'all_of',
    any_of = 'any_of'
}

export interface TerminalInfo {
    terminalId: number;
    disabled: boolean;
    predicateType: PredicateType;
}

function inPredicates(predicates: Predicate[], shopID: string, partyID: string): boolean {
    for (const predicate of predicates) {
        if (extractPredicateInfo(predicate, shopID, partyID).shopPartyContain) {
            return true;
        }
    }
}

function inPartyCondition({ party }: Condition, shopID: string, partyID: string): boolean {
    const shopIs = get(party, 'definition.shop_is');
    return party.id === partyID && shopIs === shopID;
}

function isDisabled(all_of: any[]): boolean {
    const found = all_of.find(pre => pre.constant === null);
    return found ? found : false;
}

function extractPredicateInfo(
    { all_of, any_of, condition, is_not }: any,
    shopID: string,
    partyID: string
): PredicateInfo {
    if (all_of && all_of.length > 0) {
        return {
            shopPartyContain: inPredicates(all_of, shopID, partyID),
            predicateType: PredicateType.all_of,
            disabled: isDisabled(all_of)
        };
    }
    if (any_of && any_of.length > 0) {
        return {
            shopPartyContain: inPredicates(any_of, shopID, partyID),
            predicateType: PredicateType.any_of,
            disabled: false
        };
    }
    if (is_not && is_not.length > 0) {
        return {
            shopPartyContain: inPartyCondition(is_not, shopID, partyID),
            predicateType: PredicateType.is_not,
            disabled: true
        };
    }
    if (condition && condition.party) {
        return {
            shopPartyContain: inPartyCondition(condition, shopID, partyID),
            predicateType: PredicateType.condition,
            disabled: false
        };
    }
    return {
        shopPartyContain: false
    };
}

const extractIdsFromValue = (value: TerminalRef[]): number[] => value.map(v => v.id);

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

const extractTerminalInfoGroup = (
    decisions: any[],
    shopID: string,
    partyID: string
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
                predicateType
            });
        }
        return r;
    }, []);

const flatternGroup = (group: TerminalInfoGroup[]): TerminalInfo[] =>
    group.reduce(
        (r, { terminalIds, disabled, predicateType }) =>
            (r = [
                ...r,
                ...terminalIds.map(terminalId => ({
                    terminalId,
                    disabled,
                    predicateType
                }))
            ]),
        []
    );

// Need TerminalDecision with if_ then_
export function extractTerminalInfo(
    decisions: any[],
    shopID: string,
    partyID: string
): TerminalInfo[] {
    const extractedGroup = extractTerminalInfoGroup(decisions, shopID, partyID);
    return flatternGroup(extractedGroup);
}
