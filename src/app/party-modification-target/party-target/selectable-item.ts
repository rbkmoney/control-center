import { Contract, Shop, Contractor } from '../../gen-damsel/domain';

export class SelectableItem {
    id: string;
    item: Contract | Shop | Contractor;
    checked: boolean;
}
