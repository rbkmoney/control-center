import { ModificationUnitContainer } from './modification-unit-container';
import { ContractModificationName, ShopModificationName } from '../../party-modification-creator';

export class PartyModificationContainer {
    name: ContractModificationName | ShopModificationName;
    unitContainers: ModificationUnitContainer[];
}
