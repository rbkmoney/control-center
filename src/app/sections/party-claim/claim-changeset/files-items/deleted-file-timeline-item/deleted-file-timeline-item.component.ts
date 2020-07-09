import { Component } from '@angular/core';

import { TimelineAction } from '../../timeline-action';

@Component({
    selector: 'cc-deleted-file-timeline-item',
    templateUrl: 'deleted-file-timeline-item.component.html',
    styleUrls: ['deleted-file-timeline-item.component.scss'],
})
export class DeletedFileTimelineItemComponent {
    timelineAction = TimelineAction;
}
