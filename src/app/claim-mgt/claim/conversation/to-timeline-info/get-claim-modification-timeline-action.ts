import { ClaimStatus } from '../../../../papi/model/claim-statuses';
import { getUnionKey } from '../../../../shared/utils';
import {
    ClaimModification,
    CommentModification,
    FileModification,
    StatusModificationUnit,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { TimelineAction } from './model';

function getStatusModificationTimelineAction(unit: StatusModificationUnit): TimelineAction | null {
    const Status = ClaimStatus;
    switch (getUnionKey(unit.status)) {
        case Status.accepted:
            return TimelineAction.statusAccepted;
        case Status.denied:
            return TimelineAction.statusDenied;
        case Status.pending:
            return TimelineAction.statusPending;
        case Status.review:
            return TimelineAction.statusReview;
        case Status.revoked:
            return TimelineAction.statusRevoked;
        case Status.pending_acceptance:
            return null;
    }
}

function getFileAction(m: FileModification): TimelineAction | null {
    switch (getUnionKey(m)) {
        case 'creation':
            return TimelineAction.filesAdded;
        case 'deletion':
            return TimelineAction.filesDeleted;
    }
}

function getCommentAction(m: CommentModification): TimelineAction | null {
    switch (getUnionKey(m)) {
        case 'creation':
            return TimelineAction.commentAdded;
        case 'deletion':
            return TimelineAction.commentDeleted;
    }
}

export function getClaimModificationTimelineAction(m: ClaimModification): TimelineAction | null {
    switch (getUnionKey(m)) {
        case 'document_modification':
            return TimelineAction.addedDocument;
        case 'status_modification':
            return getStatusModificationTimelineAction(
                m.status_modification as StatusModificationUnit
            );
        case 'file_modification':
            return getFileAction(m.file_modification.modification);
        case 'comment_modification':
            return getCommentAction(m.comment_modification.modification);
    }
    throw new Error(`Unknown claimModification: ${m}`);
}
