import cloneDeep from 'lodash-es/cloneDeep';

import { ProviderObject, TerminalDecision } from '../../gen-damsel/domain';
import { checkSelector } from './utils';

const checkCondition = (condition: any, partyID: string, shopID: string): boolean => {
    const isPartyEquals = condition.party.id === partyID;
    const isShopEquals = condition.party.definition.shop_is === shopID;
    return isPartyEquals && isShopEquals;
};

const filterDecision = (decision: any, partyID: string, shopID: string): TerminalDecision => {
    const { condition, any_of } = decision.if_;
    if (condition && condition.party) {
        const matched = checkCondition(condition, partyID, shopID);
        return matched ? null : decision;
    }
    if (any_of) {
        const newPredicates = [...decision.if_.any_of].filter((predicate: any) => {
            if (predicate.condition) {
                return !checkCondition(predicate.condition, partyID, shopID);
            }
            return true;
        });
        if (newPredicates.length > 0) {
            decision.if_.any_of = newPredicates;
        } else {
            return null;
        }
    }
    return decision;
};

const removeDecision = (
    decisions: TerminalDecision[],
    partyID: string,
    shopID: string,
    terminalID: number
): TerminalDecision[] =>
    decisions.reduce((acc: TerminalDecision[], decision: any) => {
        const isTerminalMatched =
            decision.then_.value && decision.then_.value.map(item => item.id).includes(terminalID);
        if (isTerminalMatched) {
            const newDecision = filterDecision(decision, partyID, shopID);
            return newDecision ? acc.concat(newDecision) : acc;
        }
        return acc.concat(decision);
    }, []);

export const removeTerminalDecision = (
    providerObject: ProviderObject,
    partyID: string,
    shopID: string,
    terminalID: number
): any => {
    checkSelector(providerObject.data.terminal);
    const result = cloneDeep(providerObject);
    result.data.terminal.decisions = removeDecision(
        result.data.terminal.decisions,
        partyID,
        shopID,
        terminalID
    );
    return result;
};
