import { PartyModification } from '../../../thrift-services/damsel/gen-model/claim_management';

export class SelectableItem {
    id: string;
    data: PartyModification;
    checked?: boolean;
    unsaved?: boolean;
}
