import { Contract, Contractor, Shop } from '../../../thrift-services/damsel/gen-model/domain';

export class SelectableItem {
    id: string;
    data: Contract | Shop | Contractor;
    checked: boolean;
}
