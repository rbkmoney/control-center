import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    filter,
    switchMap,
    tap
} from 'rxjs/operators';

import { ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Statuses } from './statuses';
import { MatSnackBar } from '@angular/material/snack-bar';

class SubmitSubject {
    partyID: string;
    claimID: ClaimID;
    action: Statuses;
}

@Injectable()
export class StatusChangerService {
    private updateClaim$ = new Subject<SubmitSubject>();
    private inProgress$ = new Subject<boolean>();
    private formPrevValue = { type: null, reason: null };

    form = this.initForm();
    isLoading$ = this.inProgress$.asObservable();

    claim$: Observable<void> = this.updateClaim$.pipe(
        switchMap(({ partyID, claimID, action }) => {
            this.inProgress$.next(true);
            switch (action) {
                case Statuses.denied:
                    return this.claimManagementService
                        .denyClaim(partyID, claimID, this.form.getRawValue().reason)
                        .pipe(catchError(e => this.handleError(e)));
                case Statuses.pending:
                    return this.claimManagementService
                        .requestClaimChanges(partyID, claimID)
                        .pipe(catchError(e => this.handleError(e)));
                case Statuses.review:
                    return this.claimManagementService
                        .requestClaimReview(partyID, claimID)
                        .pipe(catchError(e => this.handleError(e)));
                case Statuses.pending_acceptance:
                    return this.claimManagementService
                        .acceptClaim(partyID, claimID)
                        .pipe(catchError(e => this.handleError(e)));
                case Statuses.revoked:
                    return this.claimManagementService
                        .revokeClaim(partyID, claimID, this.form.getRawValue().reason)
                        .pipe(catchError(e => this.handleError(e)));
                default:
                    throw new Error('Wrong action type!');
            }
        })
    );

    constructor(
        private fb: FormBuilder,
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        this.form.valueChanges
            .pipe(
                distinctUntilChanged((p, c) => {
                    return p.type === c.type && p.reason === c.reason;
                }),
                filter(v => {
                    return this.formPrevValue ? v.reason === this.formPrevValue.reason : false;
                }),
                tap(v => this.formPrevValue = v as any)
            )
            .subscribe(v => {
                const { type } = v;
                switch (type) {
                    case Statuses.denied:
                    case Statuses.revoked:
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
        this.inProgress$.next(false);
        this.snackBar.open('Status change error', 'OK', { duration: 5000 });
        console.error(e);
        return [];
    }

    private initForm() {
        return this.fb.group({
            type: ['', Validators.required],
            reason: null
        });
    }
}
