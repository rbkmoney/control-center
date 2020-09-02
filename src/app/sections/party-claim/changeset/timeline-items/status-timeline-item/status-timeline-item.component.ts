import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ChangesetInfo } from '../../changeset-infos';
import { UnsavedClaimChangesetService } from '../../unsaved-changeset/unsaved-claim-changeset.service';
import { MenuConfigItem } from '../menu-config';

@Component({
    selector: 'cc-status-timeline-item',
    templateUrl: 'status-timeline-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTimelineItemComponent {
    @Input()
    changesetInfo: ChangesetInfo;

    @Input()
    menuConfig: MenuConfigItem[];

    @Output()
    menuItemSelected: EventEmitter<MenuConfigItem> = new EventEmitter();

    constructor(private unsavedClaimChangesetService: UnsavedClaimChangesetService) {}

    getReason(): string {
        const { status } = this.changesetInfo.modification.claim_modification.status_modification;
        return status.revoked?.reason || status.denied?.reason;
    }

    action(item: MenuConfigItem) {
        this.menuItemSelected.emit(item);
    }
}
