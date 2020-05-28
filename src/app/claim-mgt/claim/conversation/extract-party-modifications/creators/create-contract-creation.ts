import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

export const createContractCreation = (
    questionaryData: QuestionaryData,
    contractorID: string
): PartyModification => ({
    contract_modification: {
        id: uuid(),
        modification: {
            creation: {},
            contractor_modification: contractorID,
        },
    },
});
