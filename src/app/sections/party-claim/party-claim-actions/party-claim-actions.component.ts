import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, take } from 'rxjs/operators';

import {
    PartyModificationCreatorDialogService,
    UnitActionType,
} from '../../../party-modification-creator';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { UnsavedClaimChangesetService } from '../changeset/unsaved-changeset/unsaved-claim-changeset.service';

@Component({
    selector: 'cc-party-claim-actions',
    templateUrl: 'party-claim-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimActionsComponent {
    @Input()
    partyID: PartyID;

    constructor(
        private unsavedClaimChangesetService: UnsavedClaimChangesetService,
        private partyModificationCreatorDialogService: PartyModificationCreatorDialogService
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
}
