import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, Observable, of, Subject } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    filter,
    pairwise,
    pluck,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs/operators';

import { ClaimManagementService } from '../../../../thrift-services/damsel/claim-management.service';
import { ClaimID } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from './claim-status';

class UpdateClaim {
    partyID: string;
    claimID: ClaimID;
    action: ClaimStatus;
}

@Injectable()
export class StatusChangerService {
    private updateClaim$ = new Subject<UpdateClaim>();
    private hasError$ = new Subject();

    form = this.initForm();

    claim$: Observable<void> = this.updateClaim$.pipe(
        tap(() => this.hasError$.next()),
        switchMap(({ partyID, claimID, action }) => {
            switch (action) {
                case ClaimStatus.denied:
                    return this.claimManagementService
                        .denyClaim(partyID, claimID, this.form.getRawValue().reason)
                        .pipe(catchError((e) => this.handleError(e)));
                case ClaimStatus.pending:
                    return this.claimManagementService
                        .requestClaimChanges(partyID, claimID)
                        .pipe(catchError((e) => this.handleError(e)));
                case ClaimStatus.review:
                    return this.claimManagementService
                        .requestClaimReview(partyID, claimID)
                        .pipe(catchError((e) => this.handleError(e)));
                case ClaimStatus.accepted:
                    return this.claimManagementService
                        .acceptClaim(partyID, claimID)
                        .pipe(catchError((e) => this.handleError(e)));
                case ClaimStatus.revoked:
                    return this.claimManagementService
                        .revokeClaim(partyID, claimID, this.form.getRawValue().reason)
                        .pipe(catchError((e) => this.handleError(e)));
                default:
                    throw new Error('Wrong action type!');
            }
        }),
        filter((result) => result !== 'error'),
        shareReplay(1)
    );

    inProgress$ = progress(this.updateClaim$, merge([this.claim$, this.hasError$]));

    constructor(
        private fb: FormBuilder,
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        this.inProgress$.subscribe((q) => console.log('inProgress$', q));
        this.form.valueChanges
            .pipe(
                distinctUntilChanged((p, c) => {
                    return p.type === c.type && p.reason === c.reason;
                }),
                pairwise(),
                filter(([prev, curr]) => prev.reason === curr.reason),
                pluck(1, 'type')
            )
            .subscribe((type) => {
                switch (type) {
                    case ClaimStatus.denied:
                    case ClaimStatus.revoked:
                        this.form.setControl('reason', this.fb.control(null, Validators.required));
                        break;
                    default:
                        this.form.setControl('reason', this.fb.control(null));
                        break;
                }
            });
    }

    updateClaim(partyID: string, claimID: ClaimID) {
        this.updateClaim$.next({ partyID, claimID, action: this.form.getRawValue().type });
    }

    private handleError(e: any) {
        this.snackBar.open('Status change error', 'OK', { duration: 5000 });
        this.hasError$.next(e);
        return of('error');
    }

    private initForm() {
        return this.fb.group({
            type: ['', Validators.required],
            reason: null,
        });
    }
}
