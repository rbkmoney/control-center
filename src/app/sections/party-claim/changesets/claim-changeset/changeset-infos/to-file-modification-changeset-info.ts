import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from './changeset-info';

const getFileChangesetInfoHash = (unit: ModificationUnit): string => {
    return `fileModification.${unit.modification.claim_modification.file_modification.id}`;
};

const makeFileChangesetInfo = (unit: ModificationUnit): ChangesetInfo => ({
    createdAt: unit.created_at,
    modification: unit.modification,
    userInfo: unit.user_info,
    type: 'fileModification',
    hash: getFileChangesetInfoHash(unit),
});

export const toFileModificationChangesetInfo = (
    unit: ModificationUnit,
    infos: ChangesetInfo[]
): ChangesetInfo[] => {
    const fileChangesetInfo = makeFileChangesetInfo(unit);
    return [
        ...infos.map((info) =>
            info.hash === fileChangesetInfo.hash ? { ...info, removed: true } : info
        ),
        fileChangesetInfo,
    ];
};
