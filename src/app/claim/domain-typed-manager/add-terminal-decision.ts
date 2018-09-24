import last from 'lodash-es/last';
import dropRight from 'lodash-es/dropRight';
import cloneDeep from 'lodash-es/cloneDeep';
import {
    ProviderObject,
    TerminalSelector,
    TerminalDecision
} from '../../damsel';
import { toGenTerminalDecision } from '../../thrift/converters';

const createDecision = (partyID: string, shopID: string, terminalID: number): TerminalDecision =>
    ({
        if_: {
            condition: {
                party: {
                    id: partyID,
                    definition: {
                        shopIs: shopID
                    }
                }
            }
        },
        then_: {
            value: [{id: terminalID}]
        }
    });

const addDecision = (decisions: TerminalDecision[], newDecision: TerminalDecision): TerminalDecision[] => {
    let result;
    if (!decisions || decisions.length === 0) {
        result = [newDecision];
    } else {
        result = dropRight(decisions).concat([newDecision, last(decisions)]);
    }
    return result;
};

const checkSelector = (selector: TerminalSelector) => {
    if (selector.value) {
        throw new Error('Wrong ProviderObject terminal selector: "value". Expected ProviderObject with terminal decisions');
    }
};

export const addTerminalDecision = (providerObject: ProviderObject, partyID: string, shopID: string, terminalID: number): any => {
    checkSelector(providerObject.data.terminal);
    const result = cloneDeep(providerObject);
    const decision = toGenTerminalDecision(createDecision(partyID, shopID, terminalID));
    result.data.terminal.decisions = addDecision(providerObject.data.terminal.decisions, decision);
    return result;
};
