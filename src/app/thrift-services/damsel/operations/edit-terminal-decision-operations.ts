import { toGenDomainObject } from '../../converters';
import { editTerminalDecisionPropertyForShop } from './edit-terminal-decision-property-for-shop';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';
import { ProviderObject } from '../gen-model/domain';
import { UpdateOp } from '../gen-model/domain_config';

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
