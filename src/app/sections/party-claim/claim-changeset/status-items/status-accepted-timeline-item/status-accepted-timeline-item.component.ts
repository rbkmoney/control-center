import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-status-accepted-timeline-item',
    templateUrl: 'status-accepted-timeline-item.component.html',
})
export class StatusAcceptedTimelineItemComponent {
    timelineAction = TimelineAction;
}
