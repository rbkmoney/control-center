import { ContractModification, ShopModification } from '../../backend/model/damsel';

export interface CreateChangeItem {
    getValue(): ContractModification | ShopModification;

    isValid(): boolean;
}
