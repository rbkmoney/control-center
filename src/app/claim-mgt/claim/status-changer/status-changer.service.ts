import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectableObservable, Observable, Subject } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    filter,
    pairwise,
    pluck,
    publish,
    shareReplay,
    switchMap
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';

import { ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Statuses } from './statuses';

class UpdateClaim {
    partyID: string;
    claimID: ClaimID;
    action: Statuses;
}

@Injectable()
export class StatusChangerService {
    private updateClaim$ = new Subject<UpdateClaim>();

    form = this.initForm();

    claim$: Observable<void> = this.updateClaim$.pipe(
        switchMap(({ partyID, claimID, action }) => {
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
        }),
        shareReplay(1)
    );

    isLoading$ = progress(this.updateClaim$, this.claim$).pipe(
        shareReplay(1),
        publish()
    ) as ConnectableObservable<boolean>;

    constructor(
        private fb: FormBuilder,
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        this.isLoading$.connect();
        this.form.valueChanges
            .pipe(
                distinctUntilChanged((p, c) => {
                    return p.type === c.type && p.reason === c.reason;
                }),
                pairwise(),
                filter(([prev, curr]) => prev.reason === curr.reason),
                pluck(1, 'type')
            )
            .subscribe(type => {
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
