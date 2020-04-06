import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClaimService } from '../claim.service';

@Component({
    templateUrl: 'deny-claim.component.html'
})
export class DenyClaimComponent {
    isLoading = false;

    reason = '';

    constructor(
        private dialogRef: MatDialogRef<DenyClaimComponent>,
        private claimService: ClaimService,
        private snackBar: MatSnackBar
    ) {}

    deny() {
        this.isLoading = true;
        this.claimService.denyClaim(this.reason).subscribe(
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
