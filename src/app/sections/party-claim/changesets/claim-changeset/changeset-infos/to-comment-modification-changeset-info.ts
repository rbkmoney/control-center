import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';
import { markRemoved } from './mark-removed';

const getCommentChangesetInfoHash = (unit: ModificationUnit): string => {
    return `${ChangesetInfoType.commentModification}.${unit.modification.claim_modification.comment_modification.id}`;
};

const makeCommentChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.commentModification,
        hash: getCommentChangesetInfoHash(unit),
    } as ChangesetInfo);

export const toCommentModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => {
    const commentChangesetInfo = makeCommentChangesetInfo(unit);
    return [...markRemoved(infos, commentChangesetInfo.hash), commentChangesetInfo];
};
