import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: [],
})
export class ClaimComponent {
    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimService,
        private snackBar: MatSnackBar
    ) {
        this.route.params
            .pipe(
                switchMap(({ action, party_id, claim_id }) =>
                    this.claimService.resolveClaimInfo(action, party_id, claim_id)
                )
            )
            .subscribe({
                error: (error) => {
                    console.error(error);
                    this.snackBar.open('An error occurred while claim resolving', 'OK');
                },
            });
    }
}
