import { toGenCommit } from '../../converters';
import { ProviderObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { createRemoveTerminalFromProviderOperation } from './create-remove-terminal-from-provider-operation';
import { RemoveTerminalFromShopParams } from './remove-terminal-from-shop-params';

export const createRemoveTerminalFromShopCommit = (
    providerObject: ProviderObject,
    params: RemoveTerminalFromShopParams
): Commit => {
    const updateProvider = {
        update: createRemoveTerminalFromProviderOperation(providerObject, params)
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};
