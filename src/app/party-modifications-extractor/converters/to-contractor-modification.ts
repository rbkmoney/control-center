import * as uuid from 'uuid/v4';

import {
    ContractorModification,
    PartyModification,
} from '../../thrift-services/damsel/gen-model/claim_management';

export const toContractorModification = (
    modification: ContractorModification,
    id: string = uuid()
): PartyModification => ({
    contractor_modification: {
        id,
        modification,
    },
});
