import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { UnsavedClaimChangesetService } from '../../unsaved-changeset/unsaved-claim-changeset.service';

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

    @Input()
    index?: number;

    constructor(private unsavedClaimChangesetService: UnsavedClaimChangesetService) {}

    remove() {
        this.unsavedClaimChangesetService.remove(this.index);
    }
}
