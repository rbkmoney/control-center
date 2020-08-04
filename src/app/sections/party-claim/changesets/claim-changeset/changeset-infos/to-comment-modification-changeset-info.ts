import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from './changeset-info';

const getCommentChangesetInfoHash = (unit: ModificationUnit): string => {
    return `commentModification.${unit.modification.claim_modification.comment_modification.id}`;
};

const makeCommentChangesetInfo = (unit: ModificationUnit): ChangesetInfo => ({
    createdAt: unit.created_at,
    modification: unit.modification,
    userInfo: unit.user_info,
    type: 'commentModification',
    hash: getCommentChangesetInfoHash(unit),
});

export const toCommentModificationChangesetInfo = (
    unit: ModificationUnit,
    infos: ChangesetInfo[]
): ChangesetInfo[] => {
    const commentChangesetInfo = makeCommentChangesetInfo(unit);
    return [
        ...infos.map((info) =>
            info.hash === commentChangesetInfo.hash ? { ...info, removed: true } : info
        ),
        commentChangesetInfo,
    ];
};
