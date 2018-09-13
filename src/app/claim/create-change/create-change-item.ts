import { ContractModification, ShopModification } from '../../damsel';
import { CreateTerminalParams } from '../../thrift/domain-typed-manager';

export interface CreateChangeItem {
    getValue(): ContractModification | ShopModification | CreateTerminalParams;

    isValid(): boolean;
}
