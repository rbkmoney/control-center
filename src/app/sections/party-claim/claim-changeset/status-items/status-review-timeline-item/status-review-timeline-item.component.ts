import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-status-review-timeline-item',
    templateUrl: 'status-review-timeline-item.component.html',
})
export class StatusReviewTimelineItemComponent {
    timelineAction = TimelineAction;
}
