import {
    ContractModificationUnit,
    ShopModificationUnit
} from '../../thrift-services/damsel/gen-model/payment_processing';

export class ModificationUnitContainer {
    saved: boolean;
    typeHash?: string;
    modificationUnit: ContractModificationUnit | ShopModificationUnit;
}
