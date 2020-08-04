import * as base from '../../../../../thrift-services/damsel/gen-model/base';
import {
    Modification,
    UserInfo,
} from '../../../../../thrift-services/damsel/gen-model/claim_management';

export class ChangesetInfo {
    createdAt: base.Timestamp;
    modification: Modification;
    userInfo: UserInfo;
    type: string;
    hash: string;
    outdated?: boolean;
    removed?: boolean;
}
