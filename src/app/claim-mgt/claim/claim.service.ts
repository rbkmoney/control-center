import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { ClaimManagementService } from '../../thrift/claim-management.service';
import { Claim } from '../../gen-damsel/claim_management';

@Injectable()
export class ClaimService {
    claim$: Subject<Claim> = new Subject();

    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {}

    getClaim(partyID: string, claimID: number) {
        this.claimManagementService.getClaim(partyID, claimID).subscribe(
            claim => this.claim$.next(claim),
            e => {
                console.error(e);
                this.snackBar.open('An error occurred while claim accepting', 'OK');
            }
        );
    }
}
