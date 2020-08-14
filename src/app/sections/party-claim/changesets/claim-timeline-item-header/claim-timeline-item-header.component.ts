import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-claim-timeline-item-header',
    templateUrl: 'claim-timeline-item-header.component.html',
    styleUrls: ['./claim-timeline-item-header.component.scss'],
})
export class ClaimTimelineItemHeaderComponent {
    @Input()
    username: string;

    @Input()
    createdAt: string;

    @Input()
    text: string;

    @Input()
    outdated?: boolean;

    @Input()
    removed?: boolean;
}
