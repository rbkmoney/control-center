import { CategoryRef } from '../../../../thrift-services/damsel/gen-model/domain';

interface ExtractParamsFormValue {
    contractCreation: boolean;
    payoutToolCreation: boolean;
    shopCreation: boolean;
}

export interface ExtractFormValue {
    params: ExtractParamsFormValue;
    category: CategoryRef;
}
