import { Component } from '@angular/core';

import { TimelineAction } from '../claim-changeset/timeline-action';

@Component({
    selector: 'cc-file-timeline-item',
    templateUrl: 'file-timeline-item.component.html',
    styleUrls: ['file-timeline-item.component.html'],
})
export class FileTimelineItemComponent {
    timelineAction = TimelineAction;
}
