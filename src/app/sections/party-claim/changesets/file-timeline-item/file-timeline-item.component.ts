import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-file-timeline-item',
    templateUrl: 'file-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTimelineItemComponent {
    timelineAction = TimelineAction;
}
