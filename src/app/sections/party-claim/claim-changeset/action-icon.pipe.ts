import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './timeline-action';

@Pipe({
    name: 'actionIcon',
})
export class ActionIconPipe implements PipeTransform {
    transform(action: TimelineAction): string {
        return ({
            [TimelineAction.statusPending]: 'double_arrow',
            [TimelineAction.statusReview]: 'double_arrow',
            [TimelineAction.statusRevoked]: 'block',
            [TimelineAction.statusDenied]: 'block',
            [TimelineAction.statusAccepted]: 'check',
            [TimelineAction.filesAdded]: 'attach_file',
            [TimelineAction.commentAdded]: 'add_comment',
            [TimelineAction.documentAdded]: 'add',
            [TimelineAction.partyModificationAdded]: 'add',
            [TimelineAction.commentDeleted]: 'clear',
            [TimelineAction.filesDeleted]: 'clear',
        } as const)[action];
    }
}
