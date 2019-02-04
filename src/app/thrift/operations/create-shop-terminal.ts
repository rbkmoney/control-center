import { createTerminalObject } from './create-terminal-object';
import { CreateTerminalParams } from './create-terminal-params';
import { toGenCommit, toGenDomainObject } from '../converters';
import { ProviderObject, TerminalObject, Commit } from '../../damsel';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';

export const createShopTerminal = (
    terminalObjects: TerminalObject[],
    providerObject: ProviderObject,
    params: CreateTerminalParams
): Commit => {
    const terminalObject = createTerminalObject(terminalObjects, params);
    const insertTerminal = {
        insert: {
            object: toGenDomainObject(terminalObject, 'terminal')
        }
    };
    const updateProvider = {
        update: createAddTerminalToProviderOperation(providerObject, {
            shopID: params.shopID,
            partyID: params.partyID,
            providerID: providerObject.ref.id,
            terminalID: terminalObject.ref.id
        })
    };
    const commit = {
        ops: [insertTerminal, updateProvider]
    };
    return toGenCommit(commit);
};
