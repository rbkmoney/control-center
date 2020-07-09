import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-status-denied-timeline-item',
    templateUrl: 'status-denied-timeline-item.component.html',
})
export class StatusDeniedTimelineItemComponent {
    timelineAction = TimelineAction;
}
