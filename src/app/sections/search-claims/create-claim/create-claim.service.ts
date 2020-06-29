import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { BehaviorSubject, EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { booleanDebounceTime } from '../../../shared/operators';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';

@Injectable()
export class CreateClaimService {
    form = this.fb.group({
        partyId: ['', Validators.required],
    });

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

    inProgress$: Observable<boolean> = progress(
        this.claimCreation$,
        merge(this.claim$, this.error$)
    ).pipe(booleanDebounceTime(), shareReplay(1));

    constructor(
        private fb: FormBuilder,
        private claimService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {}

    createClaim() {
        const { partyId } = this.form.value;
        this.claimCreation$.next(partyId);
    }
}
