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
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../../../thrift-services/damsel/claim-management.service';
import { ClaimID } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from './claim-status';

class UpdateClaim {
    partyID: string;
    claimID: ClaimID;
    action: ClaimStatus;
}

@Injectable()
export class StatusChangerDialogService {
    private updateClaim$ = new Subject<UpdateClaim>();
    private hasError$ = new Subject();

    form = this.initForm();

    statusChanged$: Observable<void> = this.updateClaim$.pipe(
        tap(() => this.hasError$.next()),
        switchMap(({ partyID, claimID, action }) => {
            switch (action) {
                case ClaimStatus.denied:
                    return this.claimManagementService
                        .denyClaim(
                            partyID,
                            new Int64(parseInt(claimID, 10)),
                            this.form.getRawValue().reason
                        )
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.pending:
                    return this.claimManagementService
                        .requestClaimChanges(partyID, new Int64(parseInt(claimID, 10)))
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.review:
                    return this.claimManagementService
                        .requestClaimReview(partyID, new Int64(parseInt(claimID, 10)))
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.accepted:
                    return this.claimManagementService
                        .acceptClaim(partyID, new Int64(parseInt(claimID, 10)))
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.revoked:
                    return this.claimManagementService
                        .revokeClaim(
                            partyID,
                            new Int64(parseInt(claimID, 10)),
                            this.form.getRawValue().reason
                        )
                        .pipe(catchError(() => this.handleError()));
                default:
                    throw new Error('Wrong action type!');
            }
        }),
        filter((result) => result !== 'error'),
        shareReplay(1)
    );

    inProgress$ = progress(this.updateClaim$, merge(this.statusChanged$, this.hasError$));

    constructor(
        private fb: FormBuilder,
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        this.form.valueChanges
            .pipe(
                distinctUntilChanged((p, c) => p.type === c.type && p.reason === c.reason),
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

    private handleError() {
        this.snackBar.open('Status change error', 'OK', { duration: 5000 });
        setTimeout(() => this.hasError$.next(true), 300);
        return of('error');
    }

    private initForm() {
        return this.fb.group({
            type: ['', Validators.required],
            reason: null,
        });
    }
}
