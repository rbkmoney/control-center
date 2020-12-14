import cloneDeep from 'lodash-es/cloneDeep';
import get from 'lodash-es/get';
import { Int64 } from 'thrift-ts';

import { ProviderObject, TerminalDecision } from '../gen-model/domain';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';
import { checkSelector } from './utils';

const editDecision = (
    decisions: TerminalDecision[],
    partyID: string,
    shopID: string,
    terminalID: number,
    property: string,
    value: number | Int64
): TerminalDecision[] =>
    decisions.reduce((acc: TerminalDecision[], decision: TerminalDecision): TerminalDecision[] => {
        const decisionPredicatePartyID = get(decision, 'if_.condition.party.id');
        const decisionPredicateShopID = get(decision, 'if_.condition.party.definition.shop_is');
        if (decisionPredicatePartyID === partyID && decisionPredicateShopID === shopID) {
            const terminalIndex = decision.then_.value
                ? Array.from(decision.then_.value).findIndex((item) => item.id === terminalID)
                : -1;
            if (terminalIndex !== -1) {
                Array.from(decision.then_.value)[terminalIndex][property] = value;
            }
        }
        return acc.concat(decision);
    }, []);

export const editTerminalDecisionPropertyForShop = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): ProviderObject => {
    checkSelector(providerObject.data.terminal);
    const result = cloneDeep(providerObject);
    result.data.terminal.decisions = editDecision(
        result.data.terminal.decisions,
        params.partyID,
        params.shopID,
        params.terminalID,
        params.property,
        params.value
    );
    console.log(result);
    return result;
};
