import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-file-timeline-item',
    templateUrl: 'file-timeline-item.component.html',
})
export class FileTimelineItemComponent {
    timelineAction = TimelineAction;
}
