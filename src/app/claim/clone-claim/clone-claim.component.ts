import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ClaimService } from '../claim.service';
import { ClaimActionType } from '../claim-action-type';

interface RouteData {
    partyID: string;
    claimID: string;
}

@Component({
    templateUrl: 'clone-claim.component.html'
})
export class CloneClaimComponent {
    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<CloneClaimComponent>,
        private claimService: ClaimService,
        private snackBar: MatSnackBar,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) private data: RouteData
    ) {}

    cloneClaim() {
        this.isLoading = true;
        this.dialogRef.close();
        this.router.navigate([
            `/claims/${this.data.partyID}/${ClaimActionType.create}/${this.data.claimID}`
        ]);
    }
}
