import {
    Modification,
    UserInfo,
} from '../../../../../thrift-services/damsel/gen-model/claim_management';

export enum ChangesetInfoType {
    partyModification = 'partyModification',
    commentModification = 'commentModification',
    fileModification = 'fileModification',
    documentModification = 'documentModification',
    statusModification = 'statusModification',
    UNKNOWN = 'UNKNOWN',
}

export enum ChangesetInfoModificationType {
    creation = 'creation',
    deletion = 'deletion',
}

export interface ChangesetInfo {
    createdAt: string;
    modification: Modification;
    userInfo: UserInfo;
    type: ChangesetInfoType;
    modificationType: ChangesetInfoModificationType;
    hash: string;
    outdated?: boolean;
    removed?: boolean;
}
