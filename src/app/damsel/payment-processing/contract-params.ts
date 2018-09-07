import {
    PaymentInstitutionRef,
    ContractTemplateRef,
    Contractor,
    ContractorID
} from '../domain';

export class ContractParams {
    contractorId: ContractorID;
    template?: ContractTemplateRef;
    paymentInstitution?: PaymentInstitutionRef;

    // depricated
    contractor: Contractor;
}
