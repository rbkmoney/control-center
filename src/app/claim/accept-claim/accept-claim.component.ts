import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';

@Component({
    templateUrl: 'accept-claim.component.html'
})
export class AcceptClaimComponent {
    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<AcceptClaimComponent>,
        private claimService: ClaimService,
        private snackBar: MatSnackBar
    ) {}

    accept() {
        this.isLoading = true;
        this.claimService.acceptClaim().subscribe(
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
