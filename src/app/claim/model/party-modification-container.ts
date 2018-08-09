import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';
import { ShopModificationUnit, ContractModificationUnit } from '../../backend/model/damsel';
import { PartyModificationContainerType } from './party-modification-container-type';

export class PartyModificationContainer {
    type: PartyModificationContainerType;
    name: ContractModificationName | ShopModificationName;
    modifications: ContractModificationUnit[] | ShopModificationUnit[];
}
