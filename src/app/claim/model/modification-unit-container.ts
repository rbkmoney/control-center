import {
    ContractModificationUnit,
    ShopModificationUnit
} from '../../gen-damsel/payment_processing';

export class ModificationUnitContainer {
    saved: boolean;
    typeHash?: string;
    modificationUnit: ContractModificationUnit | ShopModificationUnit;
}
