import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { booleanDebounceTime } from '../../../shared/operators';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CreateClaimService {
    form = this.fb.group({
        partyId: ['', Validators.required]
    });

    claimCreation$ = new Subject<string>();

    claim$: Observable<Claim> = this.claimCreation$.pipe(
        switchMap((partyId) => this.claimService.createClaim(partyId, []).pipe(
            catchError(() => {
                this.snackBar.open('An error occurred while claim creation', 'OK');
                return EMPTY;
            })
        ))
    );

    inProgress$: Observable<boolean> = progress(this.claimCreation$, this.claim$).pipe(
        booleanDebounceTime()
    );

    constructor(private fb: FormBuilder, private claimService: ClaimManagementService, private snackBar: MatSnackBar
    ) {
    }

    createClaim() {
        const { partyId } = this.form.value;
        this.claimCreation$.next(partyId);
    }
}
