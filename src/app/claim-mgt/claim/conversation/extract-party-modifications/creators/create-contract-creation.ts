import { QuestionaryData } from '../../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { PaymentInstitutionRef } from '../../../../../thrift-services/damsel/gen-model/domain';

export const createContractCreation = (
    d: QuestionaryData,
    contractorID: string,
    contractID: string,
    payment_institution: PaymentInstitutionRef
): PartyModification => ({
    contract_modification: {
        id: contractID,
        modification: {
            creation: {
                contractor_id: contractorID,
                payment_institution,
            },
        },
    },
});
