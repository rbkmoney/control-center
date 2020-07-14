import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-claim-timeline-item',
    templateUrl: 'claim-timeline-item.component.html',
    styleUrls: ['claim-timeline-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimTimelineItemComponent {
    @Input()
    timelineAction: TimelineAction;
    @Input()
    createdAt: string;
}
