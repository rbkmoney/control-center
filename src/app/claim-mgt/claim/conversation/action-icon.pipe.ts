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
            [TimelineAction.statusRevoked]: 'circle_slash',
            [TimelineAction.statusDenied]: 'circle_slash',
            [TimelineAction.statusAccepted]: 'smile',
            [TimelineAction.filesAdded]: 'attach',
            [TimelineAction.commentAdded]: 'mode_comment',
            [TimelineAction.changesAdded]: 'add'
        } as const)[action];
    }
}
