import { ModificationUnit } from '../../../../../thrift-services/damsel/gen-model/claim_management';
import { ChangesetInfo } from './changeset-info';
import { toCommentModificationChangesetInfo } from './to-comment-modification-changeset-info';
import { toDocumentModificationChangesetInfo } from './to-document-modification-changeset-info';
import { toFileModificationChangesetInfo } from './to-file-modification-changeset-info';
import { toPartyModificationChangesetInfo } from './to-party-modification-changeset-info';
import { toStatusModificationChangesetInfo } from './to-status-modification-changeset-info';
import { toUnknownModificationChangesetInfo } from './to-unknown-modification-changeset-info';

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
            case 'partyModification':
                return toPartyModificationChangesetInfo(cur, acc);
            case 'commentModification':
                return toCommentModificationChangesetInfo(cur, acc);
            case 'fileModification':
                return toFileModificationChangesetInfo(cur, acc);
            case 'documentModification':
                return toDocumentModificationChangesetInfo(cur, acc);
            case 'statusModification':
                return toStatusModificationChangesetInfo(cur, acc);
            default:
                console.error('Changeset infos: Unknown type', cur);
                return toUnknownModificationChangesetInfo(cur, acc);
        }
    }, []);
