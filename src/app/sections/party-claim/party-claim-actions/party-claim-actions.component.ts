import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { UnitActionsNavListComponent } from '../../../party-modification-creator/unit-actions-nav-list';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-party-claim-actions',
    templateUrl: 'party-claim-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyClaimActionsComponent {
    @Input()
    partyID: PartyID;

    constructor(private bottomSheet: MatBottomSheet) {}

    addPartyModification() {
        this.bottomSheet.open(UnitActionsNavListComponent, {
            data: {
                type: 'allActions',
                partyID: this.partyID,
            },
        });
    }
}
