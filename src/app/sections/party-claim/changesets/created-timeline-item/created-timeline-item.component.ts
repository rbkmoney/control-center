import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'cc-created-timeline-item',
    templateUrl: 'created-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatedTimelineItemComponent {
    @Input()
    createdAt: string;
}
