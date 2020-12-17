import { TerminalID } from '../../fistful/gen-model/fistful';
import { PartyID, ProviderObject, ShopID } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';

export class AddDecisionToProvider {
    partyID: PartyID;
    shopID: ShopID;
    terminalID: TerminalID;
    providerID: number;
}

export const addDecisionToProviderCommit = (
    providerObject: ProviderObject,
    params: AddDecisionToProvider
): Commit => ({
    ops: [
        {
            update: createAddTerminalToProviderOperation(providerObject, params),
        },
    ],
});
