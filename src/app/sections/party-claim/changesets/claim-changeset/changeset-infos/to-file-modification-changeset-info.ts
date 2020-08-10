import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';
import { markRemoved } from './mark-removed';

const getFileChangesetInfoHash = (unit: ModificationUnit): string => {
    return `${ChangesetInfoType.fileModification}.${unit.modification.claim_modification.file_modification.id}`;
};

const makeFileChangesetInfo = (unit: ModificationUnit): ChangesetInfo =>
    ({
        createdAt: unit.created_at,
        modification: unit.modification,
        userInfo: unit.user_info,
        type: ChangesetInfoType.fileModification,
        hash: getFileChangesetInfoHash(unit),
    } as ChangesetInfo);

export const toFileModificationChangesetInfo = (
    infos: ChangesetInfo[],
    unit: ModificationUnit
): ChangesetInfo[] => {
    const fileChangesetInfo = makeFileChangesetInfo(unit);
    return [...markRemoved(infos, fileChangesetInfo.hash), fileChangesetInfo];
};
