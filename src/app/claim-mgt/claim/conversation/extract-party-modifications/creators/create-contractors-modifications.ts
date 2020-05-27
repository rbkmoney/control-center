import get from 'lodash-es/get';

import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { toIndividualEntityPartyModification, toLegalEntityPartyModification } from '../converters';
import { ExtractFormValue } from '../extract-form-value';

export const createContractorsModifications = (
    questionaryData: QuestionaryData,
    values: ExtractFormValue
): PartyModification[] => {
    const legalEntityCreation = values.questionary['contractor.legal_entity']
        ? toLegalEntityPartyModification(
              questionaryData,
              get(values, "questionary['bank_account.russian_bank_account']", false)
          )
        : null;
    const individualEntityCreation = values.questionary['contractor.individual_entity']
        ? toIndividualEntityPartyModification(
              questionaryData,
              get(values, "questionary['bank_account.russian_bank_account']", false)
          )
        : null;
    return [legalEntityCreation, individualEntityCreation].filter((i) => !!i);
};
