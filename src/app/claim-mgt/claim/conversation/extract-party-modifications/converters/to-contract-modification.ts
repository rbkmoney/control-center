import * as uuid from 'uuid/v4';

import {
    ContractModification,
    PartyModification,
} from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const toContractModification = (
    modification: ContractModification,
    id?: string
): PartyModification => ({
    contract_modification: {
        id: id ? id : uuid(),
        modification,
    },
});
