import { ProviderObject } from '../gen-model/domain';
import { UpdateOp } from '../gen-model/domain_config';
import { editTerminalDecisionPropertyForShop } from './edit-terminal-decision-property-for-shop';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';

export const editTerminalDecisionPropertyForShopOperation = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): UpdateOp => ({
    old_object: { provider: providerObject },
    new_object: {
        provider: editTerminalDecisionPropertyForShop(providerObject, params),
    },
});
