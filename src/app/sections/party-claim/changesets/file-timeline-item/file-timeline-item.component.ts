import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cc-file-timeline-item',
    templateUrl: 'file-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTimelineItemComponent {}
