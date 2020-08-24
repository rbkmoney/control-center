import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-timeline-item-header',
    templateUrl: 'timeline-item-header.component.html',
    styleUrls: ['./timeline-item-header.component.scss'],
})
export class TimelineItemHeaderComponent {
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
