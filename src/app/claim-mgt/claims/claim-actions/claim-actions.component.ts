import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateClaimComponent } from '../create-claim/create-claim.component';

@Component({
    selector: 'cc-claim-actions',
    templateUrl: 'claim-actions.component.html'
})
export class ClaimActionsComponent {
    constructor(private dialogRef: MatDialog) {}

    createClaim() {
        this.dialogRef.open(CreateClaimComponent, {
            width: '400px',
            disableClose: true
        });
    }
}
