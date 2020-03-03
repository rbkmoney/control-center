import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';

export interface ExtractPayload {
    recreateModifications: Modification[];
    extractedModifications: Modification[];
}

export const extractModificationsReducer = (
    acc: ExtractPayload,
    curr: Modification
): ExtractPayload => {
    if (curr.claim_modification && !curr.claim_modification.status_modification) {
        acc.recreateModifications = [...acc.recreateModifications, curr];
    }
    if (curr.party_modification) {
        acc.extractedModifications = [...acc.extractedModifications, curr];
    }
    return acc;
};

export const extractSeed = {
    recreateModifications: [],
    extractedModifications: []
};
