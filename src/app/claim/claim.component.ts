import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: []
})
export class ClaimComponent {
    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimService,
        private snackBar: MatSnackBar
    ) {
        this.route.params.subscribe((params) => {
            const { action, party_id, claim_id } = params;
            this.claimService.resolveClaimInfo(action, party_id, claim_id).subscribe({
                error: (error) => {
                    console.error(error);
                    this.snackBar.open('An error occurred while claim resolving', 'OK');
                }
            });
        });
    }
}
