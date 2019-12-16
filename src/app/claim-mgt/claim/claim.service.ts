import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';

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
        return new Observable(observer => {
            this.claimManagementService.getClaim(partyID, claimID).subscribe(
                claim => {
                    this.claim$.next(claim);
                    observer.complete();
                },
                e => {
                    console.error(e);
                    this.snackBar.open('An error occurred while claim accepting', 'OK');
                    observer.complete();
                }
            );
        });
    }

    acceptClaim(partyID: string, claimID: number, revision: number) {
        return this.claimManagementService
            .acceptClaim(partyID, claimID, revision)
            .pipe(switchMap(_ => this.getClaim(partyID, claimID)));
    }

    denyClaim(partyID: string, claimID: number, revision: number, reason: string) {
        return this.claimManagementService
            .denyClaim(partyID, claimID, revision, reason)
            .pipe(switchMap(_ => this.getClaim(partyID, claimID)));
    }
}
