import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Claim } from '../../../gen-damsel/claim_management';
import { extractClaimStatus } from '../../../shared/extract-claim-status';
import { DenyClaimComponent } from '../deny-claim/deny-claim.component';
import { AcceptClaimComponent } from '../accept-claim/accept-claim.component';
import { ClaimStatus } from '../../../papi/model/claim-statuses';

@Component({
    selector: 'cc-claim-details',
    templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnChanges {
    @Input() claim: Claim;

    isLoading$;
    status: ClaimStatus;

    constructor(private dialog: MatDialog) {}

    accept() {
        const claim = this.claim;
        this.dialog.open(AcceptClaimComponent, {
            data: {
                claimID: claim.id,
                partyID: claim.party_id,
                revision: claim.revision
            },
            disableClose: true
        });
    }

    deny() {
        const claim = this.claim;
        this.dialog.open(DenyClaimComponent, {
            data: {
                claimID: claim.id,
                partyID: claim.party_id,
                revision: claim.revision
            },
            disableClose: true,
            width: '30vw'
        });
    }

    isCanAcceptOrDeny(): boolean {
        return (
            !!this.status &&
            this.status !== ClaimStatus.revoked &&
            this.status !== ClaimStatus.denied
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { claim } = changes;
        if (claim.currentValue) {
            this.status = extractClaimStatus(claim.currentValue.status);
        }
    }
}
