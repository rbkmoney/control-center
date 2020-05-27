import { CategoryRef } from '../../../../thrift-services/damsel/gen-model/domain';

interface QuestionaryFormValue {
    'contractor.individual_entity'?: boolean;
    'contractor.legal_entity'?: boolean;
    'bank_account.russian_bank_account'?: boolean;
    'shop_info.location'?: boolean;
    'shop_info.details'?: boolean;
}

export interface ExtractFormValue {
    category: CategoryRef;
    questionary: QuestionaryFormValue;
}
