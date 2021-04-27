import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { PaymentInstitutionRef } from '../../../../../thrift-services/damsel/gen-model/domain';

export const createContractCreation = (
    contractorId: string,
    contractId: string,
    paymentInstitution: PaymentInstitutionRef
): PartyModification => ({
    contract_modification: {
        id: contractId,
        modification: {
            creation: {
                contractor_id: contractorId,
                payment_institution: paymentInstitution,
            },
        },
    },
});
