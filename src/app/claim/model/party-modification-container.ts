import {
    ContractModificationName,
    ShopModificationName,
} from '../../party-modification-creator-legacy';
import { ModificationUnitContainer } from './modification-unit-container';

export class PartyModificationContainer {
    name: ContractModificationName | ShopModificationName;
    unitContainers: ModificationUnitContainer[];
}
