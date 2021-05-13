import { getUnionKey } from '@cc/utils/get-union-key';

import { ClaimStatus } from '../../../../papi/model';
import {
    ClaimModification,
    StatusModificationUnit,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { TimelineAction } from './model';

function getStatusModificationTimelineAction(unit: StatusModificationUnit): TimelineAction | null {
    switch (getUnionKey(unit.status)) {
        case ClaimStatus.Accepted:
            return TimelineAction.statusAccepted;
        case ClaimStatus.Denied:
            return TimelineAction.statusDenied;
        case ClaimStatus.Pending:
            return TimelineAction.statusPending;
        case ClaimStatus.Review:
            return TimelineAction.statusReview;
        case ClaimStatus.Revoked:
            return TimelineAction.statusRevoked;
        case ClaimStatus.PendingAcceptance:
            return null;
    }
}

export function getClaimModificationTimelineAction(m: ClaimModification): TimelineAction | null {
    switch (getUnionKey(m)) {
        case 'document_modification':
            return TimelineAction.changesAdded;
        case 'status_modification':
            return getStatusModificationTimelineAction(m.status_modification);
        case 'file_modification':
            return TimelineAction.filesAdded;
        case 'comment_modification':
            return TimelineAction.commentAdded;
    }
    throw new Error(`Unknown claimModification: ${m}`);
}
