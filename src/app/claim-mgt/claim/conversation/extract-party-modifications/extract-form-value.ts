import { CategoryRef } from '../../../../thrift-services/damsel/gen-model/domain';

interface ModsFormValue {
    contractCreation: boolean;
    payoutToolCreation: boolean;
    shopCreation: boolean;
}

export interface ExtractFormValue {
    category: CategoryRef;
    mods: ModsFormValue;
}
