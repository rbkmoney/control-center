import {
    CategoryRef,
    PaymentInstitutionRef,
} from '../../../../thrift-services/damsel/gen-model/domain';

interface ContractorId {
    id: string;
}

export interface ExtractFormValue {
    category: CategoryRef;
    payment_institution: PaymentInstitutionRef;
    contractor: ContractorId;
}
