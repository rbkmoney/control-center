import { ShopModificationUnit } from './shop-modification-unit';
import { ContractModificationUnit } from './contract-modification-unit';

export class PartyModification {
    contractModification?: ContractModificationUnit;
    shopModification?: ShopModificationUnit;
}
