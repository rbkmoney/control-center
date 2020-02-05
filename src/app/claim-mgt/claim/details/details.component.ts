import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs/operators';

import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { StatusChangerComponent } from '../status-changer/status-changer.component';
import { getAvailableClaimStatuses } from '../status-changer/get-available-claim-statuses';
import { ClaimService } from '../claim.service';
import { UnitActionsNavListComponent } from '../../../party-modification-creator';

@Component({
    selector: 'cc-claim-details',
    templateUrl: 'details.component.html'
})
export class DetailsComponent {
    @Input() claim: Claim;

    constructor(
        private dialog: MatDialog,
        private claimService: ClaimService,
        private bottomSheet: MatBottomSheet
    ) {}

    editStatus() {
        this.dialog
            .open(StatusChangerComponent, {
                width: '500px',
                disableClose: true,
                data: {
                    partyID: this.claim.party_id,
                    claimID: this.claim.id,
                    claimStatus: this.claim.status
                }
            })
            .afterClosed()
            .pipe(filter(r => r))
            .subscribe(_ => {
                this.claimService.getClaim(this.claim.party_id, this.claim.id);
            });
    }

    canChangeStatus(): boolean {
        return getAvailableClaimStatuses(this.claim.status).length > 0;
    }

    addModification() {
        this.bottomSheet.open(UnitActionsNavListComponent, {
            data: {
                type: 'allActions',
                partyID: this.claim.party_id
            }
        });
    }
}
