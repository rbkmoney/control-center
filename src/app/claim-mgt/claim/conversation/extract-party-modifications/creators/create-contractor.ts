import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toIndividualEntityPartyModification, toLegalEntityPartyModification } from '../converters';

export const createContractor = (d: QuestionaryData, contractorID: string): PartyModification => {
    const isLegalEntityExist = get(d, 'contractor.legal_entity', false);
    const isIndividualEntityExist = get(d, 'contractor.individual_entity', false);

    const legalEntityCreation = isLegalEntityExist
        ? toLegalEntityPartyModification(d, contractorID)
        : null;
    const individualEntityCreation = isIndividualEntityExist
        ? toIndividualEntityPartyModification(d, contractorID)
        : null;

    if (isLegalEntityExist) {
        return legalEntityCreation;
    } else if (isIndividualEntityExist) {
        return individualEntityCreation;
    } else {
        return null;
    }
};
