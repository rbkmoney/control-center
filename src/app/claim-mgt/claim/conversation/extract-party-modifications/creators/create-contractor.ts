import get from 'lodash-es/get';
import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toIndividualEntityPartyModification, toLegalEntityPartyModification } from '../converters';

export const createContractor = (
    questionaryData: QuestionaryData,
    contractorID: string = uuid()
): PartyModification => {
    console.log(questionaryData);
    const isLegalEntityExist = get(questionaryData, 'contractor.legal_entity', false);
    const isIndividualEntityExist = get(questionaryData, 'contractor.individual_entity', false);

    const legalEntityCreation = isLegalEntityExist
        ? toLegalEntityPartyModification(questionaryData, contractorID)
        : null;
    const individualEntityCreation = isIndividualEntityExist
        ? toIndividualEntityPartyModification(questionaryData, contractorID)
        : null;

    if (isLegalEntityExist) {
        return legalEntityCreation;
    } else if (isIndividualEntityExist) {
        return individualEntityCreation;
    } else {
        return null;
    }
};
