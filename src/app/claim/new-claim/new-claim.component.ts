import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { Router } from '@angular/router';
import { ClaimActionType } from '../claim-action-type';

@Component({
    templateUrl: 'new-claim.component.html'
})
export class NewClaimComponent {
    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<NewClaimComponent>,
        private claimService: ClaimService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    newClaim() {
        this.isLoading = true;
        this.dialogRef.close();
        console.log(this.dialogRef._containerInstance._config.data);
        const partyID = this.dialogRef._containerInstance._config.data.partyID;
        const claimID = this.dialogRef._containerInstance._config.data.claimID;
        this.router.navigate([`/claims/${partyID}/${ClaimActionType.create}/${claimID}`]);
    }
}
