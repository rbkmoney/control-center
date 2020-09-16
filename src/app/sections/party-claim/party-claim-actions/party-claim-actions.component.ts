import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { map, take } from 'rxjs/operators';

import { UnitActionsNavListComponent } from '../../../party-modification-creator/unit-actions-nav-list';
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
        private bottomSheet: MatBottomSheet,
        private unsavedClaimChangesetService: UnsavedClaimChangesetService
    ) {}

    addPartyModification() {
        this.unsavedClaimChangesetService.unsavedChangesetInfos$
            .pipe(
                take(1),
                map((infos) => infos.map((info) => info.modification))
            )
            .subscribe((mods) => {
                this.bottomSheet.open(UnitActionsNavListComponent, {
                    data: {
                        type: 'allActions',
                        partyID: this.partyID,
                        unsaved: mods,
                    },
                });
            });
    }
}
