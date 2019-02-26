import { createTerminalObject } from './create-terminal-object';
import { AppendTerminalToProviderParams } from './append-terminal-to-provider-params';
import { toGenCommit, toGenDomainObject } from '../converters';
import { ProviderObject, TerminalObject } from '../../gen-damsel/domain';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';
import { Commit } from '../../gen-damsel/domain_config';

export const appendShopTerminalToProvider = (
    terminalObjects: TerminalObject[],
    providerObject: ProviderObject,
    params: AppendTerminalToProviderParams
): Commit => {
    const createdTerminalObject = createTerminalObject(terminalObjects, params);
    const insertTerminal = {
        insert: {
            object: toGenDomainObject(createdTerminalObject, 'terminal')
        }
    };
    const updateProvider = {
        update: createAddTerminalToProviderOperation(providerObject, {
            shopID: params.shopID,
            partyID: params.partyID,
            providerID: providerObject.ref.id,
            terminalID: createdTerminalObject.id
        })
    };
    const commit = {
        ops: [insertTerminal, updateProvider]
    };
    return toGenCommit(commit);
};
