import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';
import { ShopModificationUnit, ContractModificationUnit } from '../../damsel';

export class PartyModificationContainer {
    name: ContractModificationName | ShopModificationName;
    modifications: ContractModificationUnit[] | ShopModificationUnit[];
}
