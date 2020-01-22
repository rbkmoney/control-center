import { Component, Input } from '@angular/core';

import { Claim, ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { MatDialog } from '@angular/material/dialog';
import { StatusChangerComponent } from '../status-changer/status-changer.component';
import { getAvailableClaimStatuses } from '../status-changer/get-available-claim-statuses';

@Component({
    selector: 'cc-claim-details',
    templateUrl: 'details.component.html'
})
export class DetailsComponent {
    @Input() claim: Claim;

    constructor(private dialog: MatDialog) {}

    extractClaimStatus(status: ClaimStatus) {
        return extractClaimStatus(status);
    }

    editStatus() {
        this.dialog.open(StatusChangerComponent, {
            width: '500px',
            disableClose: true,
            data: {
                partyID: this.claim.party_id,
                claimID: this.claim.id,
                claimStatus: this.claim.status
            }
        });
    }

    canChangeStatus(): boolean {
        return getAvailableClaimStatuses(this.claim.status).length > 0;
    }
}
