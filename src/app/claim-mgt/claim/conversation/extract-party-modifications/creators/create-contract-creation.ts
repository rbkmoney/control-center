import * as uuid from 'uuid/v4';

import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const createContractCreation = (): PartyModification => ({
    contract_modification: {
        id: uuid(),
        modification: {
            creation: {},
        },
    },
});
