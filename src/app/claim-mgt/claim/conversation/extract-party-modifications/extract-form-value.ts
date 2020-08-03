import {
    CategoryRef,
    PaymentInstitutionRef,
} from '../../../../thrift-services/damsel/gen-model/domain';

interface ContractorID {
    id: string;
}

export interface ExtractFormValue {
    category: CategoryRef;
    payment_institution: PaymentInstitutionRef;
    contractor: ContractorID;
}
