import { getUnionKey } from '@cc/utils/get-union-key';

import { ClaimStatus } from '../../../../papi/model';
import {
    ClaimModification,
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
