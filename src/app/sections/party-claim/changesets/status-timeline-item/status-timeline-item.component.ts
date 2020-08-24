import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { UnsavedClaimChangesetService } from '../unsaved-claim-changeset/unsaved-claim-changeset.service';

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
}
