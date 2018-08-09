import { ContractModification, ShopModification } from '../../backend/model/damsel';
import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';

export class PartyModificationContainer {
    name: ContractModificationName | ShopModificationName;
    modifications: ContractModification[] | ShopModification[];
}
