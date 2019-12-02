import { ProviderObject } from '../../gen-damsel/domain';
import { UpdateOp } from '../../gen-damsel/domain_config';
import { toGenDomainObject } from '../converters';
import { editTerminalDecisionPropertyForShop } from './edit-terminal-decision-property-for-shop';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';

export const editTerminalDecisionPropertyForShopOperation = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): UpdateOp => ({
    old_object: toGenDomainObject(providerObject, 'provider'),
    new_object: toGenDomainObject(
        editTerminalDecisionPropertyForShop(providerObject, params),
        'provider'
    )
});
