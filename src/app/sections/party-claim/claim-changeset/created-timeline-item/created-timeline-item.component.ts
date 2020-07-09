import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-claim-created-timeline-item',
    templateUrl: 'created-timeline-item.component.html',
})
export class CreatedTimelineItemComponent {
    @Input()
    created_at: string;
}
