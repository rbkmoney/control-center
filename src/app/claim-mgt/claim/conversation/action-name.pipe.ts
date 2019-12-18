import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info/model';

@Pipe({
    name: 'actionName'
})
export class ActionNamePipe implements PipeTransform {
    transform(action: TimelineAction): string {
        return ({
            [TimelineAction.statusPending]: 'Changed status to Pending',
            [TimelineAction.statusReview]: 'Changed status to Review',
            [TimelineAction.statusRevoked]: 'Changed status to Revoked',
            [TimelineAction.statusDenied]: 'Changed status to Denied',
            [TimelineAction.statusAccepted]: 'Changed status to Accepted',
            [TimelineAction.filesAdded]: 'Files added',
            [TimelineAction.commentAdded]: 'Comment added',
            [TimelineAction.changesAdded]: 'Changes added'
        } as const)[action];
    }
}
