import { ProviderObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { editTerminalDecisionPropertyForShopOperation } from './edit-terminal-decision-operations';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';

export const editTerminalDecisionPropertyForShopCommit = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): Commit => ({
    ops: [
        {
            update: editTerminalDecisionPropertyForShopOperation(providerObject, params),
        },
    ],
});
