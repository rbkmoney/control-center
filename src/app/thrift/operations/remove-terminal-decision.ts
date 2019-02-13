import cloneDeep from 'lodash-es/cloneDeep';
import remove from 'lodash-es/remove';
import get from 'lodash-es/get';

import { ProviderObject, TerminalSelector, TerminalDecision } from '../../damsel';

const removeDecision = (
    decisions: TerminalDecision[],
    partyID: string,
    shopID: string,
    terminalID: number
): TerminalDecision[] => {
    let result = decisions;
    result = remove(result, (decision) => {
        const isPartyEquals = get(decision, 'if_.condition.party.id') === partyID;
        const isShopEquals = get(decision, 'if_.condition.party.definition.shopIs') === shopID;
        const isTerminalEquals = !!get(decision, 'then_.value', []).find(cats => cats.id === terminalID);
        return isPartyEquals && isShopEquals  && isTerminalEquals;
    });
    return result;
};

const checkSelector = (selector: TerminalSelector) => {
    if (selector.value) {
        throw new Error(
            'Wrong ProviderObject terminal selector: "value". Expected ProviderObject with terminal decisions'
        );
    }
};

export const removeTerminalDecision = (
    providerObject: ProviderObject,
    partyID: string,
    shopID: string,
    terminalID: number
): any => {
    checkSelector(providerObject.data.terminal);
    const result = cloneDeep(providerObject);
    result.data.terminal.decisions = removeDecision(providerObject.data.terminal.decisions, partyID, shopID, terminalID);
    return result;
};
