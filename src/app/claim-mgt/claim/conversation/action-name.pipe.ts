import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info/model';

const timelineActionNameToTitle: { [N in TimelineAction]: string } = {
    [TimelineAction.statusPending]: 'changed claim status to pending',
    [TimelineAction.statusReview]: 'changed claim status to review',
    [TimelineAction.statusRevoked]: 'revoked claim',
    [TimelineAction.statusDenied]: 'denied claim',
    [TimelineAction.statusAccepted]: 'accepted claim',
    [TimelineAction.filesAdded]: 'added files',
    [TimelineAction.filesDeleted]: 'removed files',
    [TimelineAction.commentAdded]: 'added message',
    [TimelineAction.commentDeleted]: 'removed message',
    [TimelineAction.addedDocument]: 'added document',
    [TimelineAction.partyModification]: 'added party modification',
};

@Pipe({
    name: 'actionName',
})
export class ActionNamePipe implements PipeTransform {
    transform(action: TimelineAction): string {
        return timelineActionNameToTitle[action] || action;
    }
}
