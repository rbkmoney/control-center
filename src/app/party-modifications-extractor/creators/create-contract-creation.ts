import { PartyModification } from '../../thrift-services/damsel/gen-model/claim_management';
import { PaymentInstitutionRef } from '../../thrift-services/damsel/gen-model/domain';

export const createContractCreation = (
    contractor_id: string,
    contractID: string,
    payment_institution: PaymentInstitutionRef
): PartyModification => ({
    contract_modification: {
        id: contractID,
        modification: {
            creation: {
                contractor_id,
                payment_institution,
            },
        },
    },
});
