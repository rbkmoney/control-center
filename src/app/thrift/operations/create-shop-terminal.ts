import { addTerminalDecision } from './add-terminal-decision';
import { createTerminalObject } from './create-terminal-object';
import { CreateTerminalParams } from './create-terminal-params';
import { toGenCommit, toGenDomainObject } from '../converters';
import { ProviderObject, TerminalObject, Commit } from '../../damsel';

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
        update: {
            oldObject: toGenDomainObject(providerObject, 'provider'),
            newObject: toGenDomainObject(
                addTerminalDecision(
                    providerObject,
                    params.partyID,
                    params.shopID,
                    terminalObject.ref.id
                ),
                'provider'
            )
        }
    };
    const commit = {
        ops: [insertTerminal, updateProvider]
    };
    return toGenCommit(commit);
};
