import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';
import { ModificationUnitContainer } from './modification-unit-container';

export class PartyModificationContainer {
    name: ContractModificationName | ShopModificationName;
    unitContainers: ModificationUnitContainer[];
}
