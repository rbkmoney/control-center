import { Component, Input } from '@angular/core';
import { StatusColor } from '../../../../color';

@Component({
    selector: 'cc-timeline-item-badge',
    templateUrl: 'timeline-item-badge.component.html',
    styleUrls: ['timeline-item-badge.component.scss']
})
export class TimelineItemBadgeComponent {
    @Input() color: StatusColor;
}
