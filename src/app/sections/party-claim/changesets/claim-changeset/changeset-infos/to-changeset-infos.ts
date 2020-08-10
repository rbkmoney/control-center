import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo, ChangesetInfoType } from './changeset-info';
import { toCommentModificationChangesetInfo } from './to-comment-modification-changeset-info';
import { toDocumentModificationChangesetInfo } from './to-document-modification-changeset-info';
import { toFileModificationChangesetInfo } from './to-file-modification-changeset-info';
import { toPartyModificationChangesetInfo } from './to-party-modification-changeset-info';
import { toStatusModificationChangesetInfo } from './to-status-modification-changeset-info';

const getModificationType = (unit: ModificationUnit): string => {
    if (unit.modification.party_modification) {
        return 'partyModification';
    } else if (unit.modification.claim_modification.comment_modification) {
        return 'commentModification';
    } else if (unit.modification.claim_modification.file_modification) {
        return 'fileModification';
    } else if (unit.modification.claim_modification.document_modification) {
        return 'documentModification';
    } else if (unit.modification.claim_modification.status_modification) {
        return 'statusModification';
    } else {
        return 'UNKNOWN';
    }
};

export const toChangesetInfos = (units: ModificationUnit[]): ChangesetInfo[] =>
    units.reduce((acc, cur) => {
        switch (getModificationType(cur)) {
            case ChangesetInfoType.partyModification:
                return toPartyModificationChangesetInfo(acc, cur);
            case ChangesetInfoType.commentModification:
                return toCommentModificationChangesetInfo(acc, cur);
            case ChangesetInfoType.fileModification:
                return toFileModificationChangesetInfo(acc, cur);
            case ChangesetInfoType.documentModification:
                return toDocumentModificationChangesetInfo(acc, cur);
            case ChangesetInfoType.statusModification:
                return toStatusModificationChangesetInfo(acc, cur);
            default:
                console.error('Changeset infos: Unknown type', cur);
                return acc;
        }
    }, []);
