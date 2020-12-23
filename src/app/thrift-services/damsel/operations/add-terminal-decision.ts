import cloneDeep from 'lodash-es/cloneDeep';
import dropRight from 'lodash-es/dropRight';
import last from 'lodash-es/last';

import { toGenTerminalDecision } from '../../converters';
import {
    PartyID,
    ProviderObject,
    ShopID,
    TerminalDecision,
    TerminalRef,
} from '../gen-model/domain';
import { checkSelector } from './utils';

const createDecision = (
    partyID: PartyID,
    shopID: ShopID,
    terminalID: number
): TerminalDecision => ({
    if_: {
        condition: {
            party: {
                id: partyID,
                definition: {
                    shop_is: shopID,
                },
            },
        },
    },
    then_: {
        value: ([{ id: terminalID }] as unknown) as Set<TerminalRef>,
    },
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
    partyID: PartyID,
    shopID: ShopID,
    terminalID: number
): ProviderObject => {
    checkSelector(providerObject.data.terminal);
    const result = cloneDeep(providerObject);
    const decision = toGenTerminalDecision(createDecision(partyID, shopID, terminalID));
    result.data.terminal.decisions = addDecision(providerObject.data.terminal.decisions, decision);
    return result;
};
