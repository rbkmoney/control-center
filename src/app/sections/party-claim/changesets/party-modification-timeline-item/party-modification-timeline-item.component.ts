import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'cc-party-modification-timeline-item',
    templateUrl: 'party-modification-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyModificationTimelineItemComponent {
    @Input()
    expanded = false;
}
