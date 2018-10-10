import { ContractModificationUnit, ShopModificationUnit } from '../../damsel';

export class ModificationUnitContainer {
    saved: boolean;
    modificationUnit: ContractModificationUnit | ShopModificationUnit;
}
