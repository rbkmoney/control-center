import { ContractModificationUnit, ShopModificationUnit } from '../../damsel';

export class ModificationUnitContainer {
    saved: boolean;
    typeHash?: string;
    modificationUnit: ContractModificationUnit | ShopModificationUnit;
}
