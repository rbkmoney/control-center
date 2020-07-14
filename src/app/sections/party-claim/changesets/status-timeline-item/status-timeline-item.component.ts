import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-status-timeline-item',
    templateUrl: 'status-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineItemComponent {
    timelineAction = TimelineAction;
}
