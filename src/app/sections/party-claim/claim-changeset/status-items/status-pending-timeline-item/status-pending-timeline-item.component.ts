import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-status-pending-timeline-item',
    templateUrl: 'status-pending-timeline-item.component.html',
})
export class StatusPendingTimelineItemComponent {
    timelineAction = TimelineAction;
}
