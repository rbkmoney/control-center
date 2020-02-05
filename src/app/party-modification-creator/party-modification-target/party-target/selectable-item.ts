import { Contract, Shop, Contractor } from '../../../thrift-services/damsel/gen-model/domain';

export class SelectableItem {
    id: string;
    item: Contract | Shop | Contractor;
    checked: boolean;
}
