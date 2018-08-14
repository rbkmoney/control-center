import { ContractModification, ShopModification } from '../../damsel';

export interface CreateChangeItem {
    getValue(): ContractModification | ShopModification;

    isValid(): boolean;
}
