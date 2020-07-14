import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cc-timeline-item-loading',
    templateUrl: 'timeline-item-loading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemLoadingComponent {}
