import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info/model';

@Pipe({
    name: 'actionIcon'
})
export class ActionIconPipe implements PipeTransform {
    transform(action: TimelineAction): string {
        return ({
            [TimelineAction.statusPending]: 'visibility',
            [TimelineAction.statusReview]: 'forward',
            [TimelineAction.statusRevoked]: 'close',
            [TimelineAction.statusDenied]: 'close',
            [TimelineAction.statusAccepted]: 'done',
            [TimelineAction.filesAdded]: 'attach_file',
            [TimelineAction.commentAdded]: 'mode_comment',
            [TimelineAction.changesAdded]: 'add',
            [TimelineAction.partyModification]: 'add'
        } as const)[action];
    }
}
