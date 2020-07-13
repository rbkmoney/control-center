import { Component } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-comment-timeline-item',
    templateUrl: 'comment-timeline-item.component.html',
    styleUrls: ['comment-timeline-item.component.scss'],
})
export class CommentTimelineItemComponent {
    timelineAction = TimelineAction;
}
