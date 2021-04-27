import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/utils';
import { merge, of, Subject } from 'rxjs';
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

import { ClaimStatus } from '../../../../papi/model';
import { ClaimManagementService } from '../../../../thrift-services/damsel/claim-management.service';

class UpdateClaim {
    partyID: string;
    claimID: string;
    action: ClaimStatus;
}

@Injectable()
export class StatusChangerDialogService {
    private updateClaim$ = new Subject<UpdateClaim>();
    private hasError$ = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form = this.initForm();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    statusChanged$ = this.updateClaim$.pipe(
        tap(() => this.hasError$.next()),
        switchMap(({ partyID, claimID, action }) => {
            const intClaimID = new Int64(parseInt(claimID, 10));
            switch (action) {
                case ClaimStatus.Denied:
                    return this.claimManagementService
                        .denyClaim(partyID, intClaimID, this.form.getRawValue().reason)
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.Pending:
                    return this.claimManagementService
                        .requestClaimChanges(partyID, intClaimID)
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.Review:
                    return this.claimManagementService
                        .requestClaimReview(partyID, intClaimID)
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.Accepted:
                    return this.claimManagementService
                        .acceptClaim(partyID, intClaimID)
                        .pipe(catchError(() => this.handleError()));
                case ClaimStatus.Revoked:
                    return this.claimManagementService
                        .revokeClaim(partyID, intClaimID, this.form.getRawValue().reason)
                        .pipe(catchError(() => this.handleError()));
                default:
                    throw new Error('Wrong action type!');
            }
        }),
        filter((result) => result !== 'error'),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
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
                    case ClaimStatus.Denied:
                    case ClaimStatus.Revoked:
                        this.form.setControl('reason', this.fb.control(null, Validators.required));
                        break;
                    default:
                        this.form.setControl('reason', this.fb.control(null));
                        break;
                }
            });
    }

    updateClaim(partyID: string, claimID: string) {
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
