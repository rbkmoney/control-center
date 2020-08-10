import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../claim-changeset/changeset-infos';

@Component({
    selector: 'cc-party-modification-timeline-item',
    templateUrl: 'party-modification-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyModificationTimelineItemComponent {
    @Input()
    expanded = false;

    @Input()
    changesetInfo: ChangesetInfo;
}
