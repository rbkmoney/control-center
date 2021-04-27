import {
    Modification,
    UserInfo,
} from '../../../../thrift-services/damsel/gen-model/claim_management';

/* eslint-disable @typescript-eslint/naming-convention */
export enum ChangesetInfoType {
    partyModification = 'partyModification',
    commentModification = 'commentModification',
    fileModification = 'fileModification',
    documentModification = 'documentModification',
    statusModification = 'statusModification',
}

export enum ChangesetInfoModificationType {
    creation = 'creation',
    deletion = 'deletion',
}
/* eslint-enable @typescript-eslint/naming-convention */

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
