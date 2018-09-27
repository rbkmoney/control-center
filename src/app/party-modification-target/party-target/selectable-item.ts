import { Contract, Shop, Contractor } from '../../damsel';

export class SelectableItem {
    id: string;
    item: Contract | Shop | Contractor;
    checked: boolean;
}
