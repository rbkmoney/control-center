import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-deleted-comment-timeline-item',
    templateUrl: 'deleted-comment-timeline-item.component.html',
})
export class DeletedCommentTimelineItemComponent {
    timelineAction = TimelineAction;
}
