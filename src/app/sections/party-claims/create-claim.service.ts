import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { CreateClaimService as CreateClaimServiceGeneric } from '../create-claim.service';

@Injectable()
export class CreateClaimService extends CreateClaimServiceGeneric {
    constructor(
        claimService: ClaimManagementService,
        snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super(claimService, snackBar);
        this.claim$.subscribe(({ id, party_id }) => {
            this.router.navigate([`claim-mgt/party/${party_id}/claim/${id}`]);
        });
    }

    createClaim() {
        this.route.params.pipe(pluck('partyID')).subscribe((partyID) => {
            this.claimCreation$.next(partyID);
        });
    }
}
