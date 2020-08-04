import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from './changeset-info';

const getDocumentChangesetInfoHash = (unit: ModificationUnit): string => {
    return `documentModification`;
};

const makeDocumentChangesetInfo = (unit: ModificationUnit): ChangesetInfo => ({
    createdAt: unit.created_at,
    modification: unit.modification,
    userInfo: unit.user_info,
    type: 'documentModification',
    hash: getDocumentChangesetInfoHash(unit),
});

export const toDocumentModificationChangesetInfo = (
    unit: ModificationUnit,
    infos: ChangesetInfo[]
): ChangesetInfo[] => {
    const documentChangesetInfo = makeDocumentChangesetInfo(unit);
    return [
        ...infos.map((info) =>
            info.hash === documentChangesetInfo.hash ? { ...info, outdated: true } : info
        ),
        documentChangesetInfo,
    ];
};
