import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/internal/operators';

import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['../shared/container.css']
})
export class ClaimComponent {

    constructor(private route: ActivatedRoute,
                private claimService: ClaimService,
                private snackBar: MatSnackBar) {
        this.route.params.pipe(switchMap((params) => {
            const {partyId, claimId} = params;
            return this.claimService.resolveClaimInfo(partyId, claimId);
        })).subscribe(null, (error) => {
            console.error(error);
            this.snackBar.open('An error occurred while claim resolving', 'OK');
        });
    }
}
