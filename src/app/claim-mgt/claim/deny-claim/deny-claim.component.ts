import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';

interface DenyClaimParams {
    partyID: string;
    claimID: number;
    revision: number;
}

@Component({
    templateUrl: 'deny-claim.component.html'
})
export class DenyClaimComponent {
    isLoading = false;
    reason = '';

    constructor(
        private dialogRef: MatDialogRef<DenyClaimComponent>,
        private claimService: ClaimService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: DenyClaimParams
    ) {}

    deny() {
        const { partyID, claimID, revision } = this.data;
        this.isLoading = true;
        this.claimService.denyClaim(partyID, claimID, revision, this.reason).subscribe(
            () => {
                this.isLoading = false;
                this.dialogRef.close();
                this.snackBar.open('Claim denied', 'OK', { duration: 3000 });
            },
            () => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while claim denying', 'OK');
            }
        );
    }
}
