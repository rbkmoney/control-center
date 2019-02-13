import { UpdateOp } from '../../damsel/domain-config';
import { toGenDomainObject } from '../converters';
import { ProviderObject } from '../../damsel/domain';
import { RemoveTerminalFromShopParams } from './remove-terminal-from-shop-params';
import { removeTerminalDecision } from './remove-terminal-decision';

export const createRemoveTerminalFromProviderOperation = (
    providerObject: ProviderObject,
    params: RemoveTerminalFromShopParams
): UpdateOp => ({
    oldObject: toGenDomainObject(providerObject, 'provider'),
    newObject: toGenDomainObject(
        removeTerminalDecision(providerObject, params.partyID, params.shopID, params.terminalID),
        'provider'
    )
});
