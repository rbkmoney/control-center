import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { BehaviorSubject, EMPTY, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { CreateClaimService as CreateClaimServiceGeneric } from '../create-claim.service';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { ActivatedRoute, Router } from '@angular/router';

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
