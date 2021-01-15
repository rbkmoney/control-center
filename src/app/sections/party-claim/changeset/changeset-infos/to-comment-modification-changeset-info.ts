import { getUnionKey } from '@cc/utils/get-union-key';

import {
    CommentModification,
    ModificationUnit,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoModificationType, ChangesetInfoType } from './changeset-info';
import { markRemoved } from './mark-removed';

const getCommentChangesetInfoHash = (unit: ModificationUnit): string =>
    `${ChangesetInfoType.commentModification}.${unit.modification.claim_modification.comment_modification.id}`;

const commentModificationType = (mod: CommentModification): ChangesetInfoModificationType => {
    switch (getUnionKey(mod)) {
        case 'creation':
            return ChangesetInfoModificationType.creation;
        case 'deletion':
            return ChangesetInfoModificationType.deletion;
    }
};

const makeCommentChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.commentModification,
        hash: getCommentChangesetInfoHash(unit),
        modificationType: commentModificationType(
            unit.modification.claim_modification.comment_modification.modification
        ),
    } as ChangesetInfo);

export const toCommentModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => {
    const commentChangesetInfo = makeCommentChangesetInfo(unit);
    return [...markRemoved(infos, commentChangesetInfo.hash), commentChangesetInfo];
};
