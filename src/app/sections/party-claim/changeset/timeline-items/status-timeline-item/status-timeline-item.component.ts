import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { UnsavedClaimChangesetService } from '../../unsaved-changeset/unsaved-claim-changeset.service';

@Component({
    selector: 'cc-status-timeline-item',
    templateUrl: 'status-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineItemComponent {
    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    index?: number;

    constructor(private unsavedClaimChangesetService: UnsavedClaimChangesetService) {}

    remove() {
        this.unsavedClaimChangesetService.remove(this.index);
    }

    getReason(): string {
        const { status } = this.changesetInfo.modification.claim_modification.status_modification;
        return status.revoked?.reason || status.denied?.reason;
    }
}
