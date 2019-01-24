import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['../shared/container.css']
})
export class ClaimComponent {
    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimService,
        private snackBar: MatSnackBar
    ) {
        this.route.params.subscribe(params => {
            const { action, partyId, claimId } = params;
            this.claimService.resolveClaimInfo(action, partyId, claimId).subscribe(null, error => {
                console.error(error);
                this.snackBar.open('An error occurred while claim resolving', 'OK');
            });
        });
    }
}
