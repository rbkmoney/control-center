import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { map, take } from 'rxjs/operators';

import {
    PartyModificationCreatorDialogService,
    UnitActionType,
} from '../../../party-modification-creator';
import { ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { UnsavedClaimChangesetService } from '../changeset/unsaved-changeset/unsaved-claim-changeset.service';
import { StatusChangerDialogService } from './status-changer';
import { getAvailableClaimStatuses } from './status-changer/get-available-claim-statuses';

@Component({
    selector: 'cc-party-claim-actions',
    templateUrl: 'party-claim-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimActionsComponent {
    @Input()
    partyID: PartyID;

    @Input()
    claimID: string;

    @Input()
    status: ClaimStatus;

    @Output()
    changesetUpdated = new EventEmitter();

    constructor(
        private unsavedClaimChangesetService: UnsavedClaimChangesetService,
        private partyModificationCreatorDialogService: PartyModificationCreatorDialogService,
        private statusChangerDialogService: StatusChangerDialogService
    ) {}

    addPartyModification() {
        this.unsavedClaimChangesetService.unsavedChangesetInfos$
            .pipe(
                take(1),
                map((infos) => infos.map((info) => info.modification))
            )
            .subscribe((unsaved) =>
                this.partyModificationCreatorDialogService.open(
                    UnitActionType.allActions,
                    this.partyID,
                    unsaved
                )
            );
    }

    changeStatus() {
        this.statusChangerDialogService.changed$.pipe(take(1)).subscribe(() => {
            this.changesetUpdated.emit();
        });
        this.statusChangerDialogService.open(this.partyID, this.claimID, this.status);
    }

    canChangeStatus(): boolean {
        return getAvailableClaimStatuses(this.status).length > 0;
    }
}
