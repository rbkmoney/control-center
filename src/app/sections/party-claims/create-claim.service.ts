import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, pluck, switchMap } from 'rxjs/operators';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../thrift-services/damsel/gen-model/claim_management';

@Injectable()
export class CreateClaimService {
    claimCreation$ = new Subject<string>();

    claim$: Observable<Claim> = this.claimCreation$.pipe(
        switchMap((partyId) =>
            this.claimService.createClaim(partyId, []).pipe(
                catchError(() => {
                    this.snackBar.open('An error occurred while claim creation', 'OK');
                    this.error$.next({ hasError: true });
                    return EMPTY;
                })
            )
        )
    );

    private error$ = new BehaviorSubject({ hasError: false });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private claimService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        this.claim$.subscribe(({ id, party_id }) => {
            this.router.navigate([`party/${party_id}/claim/${id}`]);
        });
    }

    createClaim() {
        this.route.params.pipe(pluck('partyID')).subscribe((partyID) => {
            this.claimCreation$.next(partyID);
        });
    }
}
