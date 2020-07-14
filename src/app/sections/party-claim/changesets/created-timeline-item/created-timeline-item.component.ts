import { Component, Input } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-created-timeline-item',
    templateUrl: 'created-timeline-item.component.html',
})
export class CreatedTimelineItemComponent {
    @Input()
    createdAt: string;

    timelineAction = TimelineAction;
}
