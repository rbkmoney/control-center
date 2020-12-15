import { ProviderObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { createRemoveTerminalFromProviderOperation } from './create-remove-terminal-from-provider-operation';
import { RemoveTerminalFromShopParams } from './remove-terminal-from-shop-params';

export const createRemoveTerminalFromShopCommit = (
    providerObject: ProviderObject,
    params: RemoveTerminalFromShopParams
): Commit => ({
    ops: [
        {
            update: createRemoveTerminalFromProviderOperation(providerObject, params),
        },
    ],
});
