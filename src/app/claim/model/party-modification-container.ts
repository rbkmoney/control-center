import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';
import { ContractModificationUnit, ShopModificationUnit } from '../../damsel';

export class PartyModificationContainer {
    name: ContractModificationName | ShopModificationName;
    modifications: ContractModificationUnit[] | ShopModificationUnit[];
}
