import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-status-revoked-timeline-item',
    templateUrl: 'status-revoked-timeline-item.component.html',
})
export class StatusRevokedTimelineItemComponent {
    timelineAction = TimelineAction;
}
