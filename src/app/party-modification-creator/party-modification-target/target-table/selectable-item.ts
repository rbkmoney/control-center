import {
    CommentModificationUnit,
    ContractModificationUnit,
    ContractorModificationUnit,
    DocumentModificationUnit,
    FileModificationUnit,
    ShopModificationUnit,
} from '../../../thrift-services/damsel/gen-model/claim_management';

export class SelectableItem {
    id: string;
    data:
        | ContractorModificationUnit
        | ContractModificationUnit
        | ShopModificationUnit
        | DocumentModificationUnit
        | FileModificationUnit
        | CommentModificationUnit;
    checked?: boolean;
    unsaved?: boolean;
}
