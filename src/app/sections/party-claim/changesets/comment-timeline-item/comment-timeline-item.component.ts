import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTimelineItemComponent {
    timelineAction = TimelineAction;
}
