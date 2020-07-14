import { Component, Input } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-claim-timeline-item-header',
    templateUrl: 'claim-timeline-item-header.component.html',
})
export class ClaimTimelineItemHeaderComponent {
    @Input()
    timelineAction: TimelineAction;

    @Input()
    createdAt: string;
}
