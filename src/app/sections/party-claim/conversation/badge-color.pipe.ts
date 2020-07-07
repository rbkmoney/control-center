import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info/model';

@Pipe({
    name: 'ccBadgeColor',
})
export class BadgeColorPipe implements PipeTransform {
    transform(action: TimelineAction): string {
        switch (action) {
            case TimelineAction.documentAdded:
            case TimelineAction.filesAdded:
            case TimelineAction.commentAdded:
            case TimelineAction.partyModificationAdded:
                return 'primary';
            case TimelineAction.statusRevoked:
                return 'warn';
            case TimelineAction.statusDenied:
                return 'error';
            case TimelineAction.statusAccepted:
                return 'success';
            default:
                return;
        }
    }
}
