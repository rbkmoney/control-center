import cloneDeep from 'lodash-es/cloneDeep';
import last from 'lodash-es/last';
import dropRight from 'lodash-es/dropRight';

import { ProviderObject, TerminalDecision, TerminalRef } from '../../gen-damsel/domain';
import { toGenTerminalDecision } from '../converters';
import { checkSelector } from './utils';

const createDecision = (partyID: string, shopID: string, terminalID: number): TerminalDecision => ({
    if_: {
        condition: {
            party: {
                id: partyID,
                definition: {
                    shop_is: shopID
                }
            }
        }
    },
    then_: {
        value: ([{ id: terminalID }] as unknown) as Set<TerminalRef>
    }
});

const addDecision = (
    decisions: TerminalDecision[],
    newDecision: TerminalDecision
): TerminalDecision[] => {
    let result;
    if (!decisions || decisions.length === 0) {
        result = [newDecision];
    } else {
        result = dropRight(decisions).concat([newDecision, last(decisions)]);
    }
    return result;
};

export const addTerminalDecision = (
    providerObject: ProviderObject,
    partyID: string,
    shopID: string,
    terminalID: number
): any => {
    checkSelector(providerObject.data.terminal);
    const result = cloneDeep(providerObject);
    const decision = toGenTerminalDecision(createDecision(partyID, shopID, terminalID));
    result.data.terminal.decisions = addDecision(providerObject.data.terminal.decisions, decision);
    return result;
};
