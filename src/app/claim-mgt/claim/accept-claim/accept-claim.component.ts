import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';

interface AcceptClaimParams {
    partyID: string;
    claimID: number;
    revision: number;
}

@Component({
    templateUrl: 'accept-claim.component.html'
})
export class AcceptClaimComponent {
    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<AcceptClaimComponent>,
        private claimService: ClaimService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: AcceptClaimParams
    ) {}

    accept() {
        const { partyID, claimID, revision } = this.data;
        this.isLoading = true;
        this.claimService.acceptClaim(partyID, claimID, revision).subscribe(
            () => {
                this.isLoading = false;
                this.dialogRef.close();
                this.snackBar.open('Claim accepted', 'OK', { duration: 3000 });
            },
            () => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while claim accepting', 'OK');
            }
        );
    }
}
