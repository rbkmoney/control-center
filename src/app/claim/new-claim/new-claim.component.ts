import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import * as uuid from 'uuid/v4';

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
        const partyId = uuid();
        this.router.navigate([`/claims/${partyId}/${ClaimActionType.create}`]);
    }

}
