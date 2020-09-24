import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'cc-timeline-item-error',
    templateUrl: 'timeline-item-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemErrorComponent {
    @Input()
    text: string;
}
