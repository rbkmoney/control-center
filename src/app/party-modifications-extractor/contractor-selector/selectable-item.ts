import { Contractor } from '../../thrift-services/damsel/gen-model/domain';

export class SelectableItem {
    id: string;
    data: Contractor;
    checked?: boolean;
    unsaved?: boolean;
}
