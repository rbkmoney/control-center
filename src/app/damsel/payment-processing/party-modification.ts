import { ShopModificationUnit } from './shop-modification-unit';
import { ContractModificationUnit } from './contract-modification-unit';
import { ContractorModificationUnit } from './contractor-modification-unit';

export class PartyModification {
    contractModification?: ContractModificationUnit;
    shopModification?: ShopModificationUnit;
    contractorModification?: ContractorModificationUnit;
}
