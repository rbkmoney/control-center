import { ProviderObject } from '../../damsel/domain';
import { Commit } from '../../gen-damsel/domain_config';
import { toGenCommit, toGenDomainObject } from '../converters';
import { addTerminalDecision } from './add-terminal-decision';

export class AddDecisionToProvider {
    partyId: string;
    shopId: string;
    terminalId: number;
    providerId: number;
}

export const addDecisionToProvider = (
    providerObjects: ProviderObject[],
    params: AddDecisionToProvider
): Commit => {
    const providerObject = providerObjects.find(obj => obj.ref.id === params.providerId);
    const updateProvider = {
        update: {
            oldObject: toGenDomainObject(providerObject, 'provider'),
            newObject: toGenDomainObject(
                addTerminalDecision(
                    providerObject,
                    params.partyId,
                    params.shopId,
                    params.terminalId
                ),
                'provider'
            )
        }
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};
