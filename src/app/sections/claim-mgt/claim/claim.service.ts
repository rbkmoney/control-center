import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Claim, ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';

@Injectable()
export class ClaimService {
    claim$: Subject<Claim> = new Subject();

    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {}

    getClaim(partyID: string, claimID: ClaimID) {
        this.claimManagementService.getClaim(partyID, claimID).subscribe(
            claim => this.claim$.next(claim),
            e => {
                console.error(e);
                this.snackBar.open('Error loading the claim', 'OK');
            }
        );
    }
}
