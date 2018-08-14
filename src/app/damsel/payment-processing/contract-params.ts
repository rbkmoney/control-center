import { PaymentInstitutionRef, ContractTemplateRef, Contractor } from '../domain';

export class ContractParams {
    contractor: Contractor;
    template?: ContractTemplateRef;
    paymentInstitution?: PaymentInstitutionRef;
}
