import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Statuses } from './statuses';

class SubmitSubject {
    partyID: string;
    claimID: ClaimID;
    action: Statuses;
}

@Injectable()
export class StatusChangerService {
    private updateClaim$ = new Subject<SubmitSubject>();
    private inProgress$ = new Subject<boolean>();

    form = this.initForm();
    isLoading$ = this.inProgress$.asObservable();

    claim$: Observable<void> = this.updateClaim$.pipe(
        switchMap(({ partyID, claimID, action }) => {
            this.inProgress$.next(true);
            switch (action) {
                case Statuses.denied:
                    return this.claimManagementService.denyClaim(
                        partyID,
                        claimID,
                        this.form.getRawValue().reason
                    );
                case Statuses.pending:
                    return this.claimManagementService.requestClaimChanges(partyID, claimID);
                case Statuses.review:
                    return this.claimManagementService.requestClaimReview(partyID, claimID);
                case Statuses.pending_acceptance:
                    return this.claimManagementService.acceptClaim(partyID, claimID);
                case Statuses.revoked:
                    return this.claimManagementService.revokeClaim(
                        partyID,
                        claimID,
                        this.form.getRawValue().reason
                    );
                default:
                    throw new Error('Wrong action type!');
            }
        }),
        catchError(e => {
            this.inProgress$.next(false);
            console.error(e);
            return [];
        }),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private claimManagementService: ClaimManagementService) {
        this.claim$.subscribe();
        this.form.valueChanges.subscribe(v => {
            const { type } = v;
            switch (type) {
                case 'denied':
                case 'revoked':
                    this.form.controls.reason.setValidators(Validators.required);
                    break;
                default:
                    this.form.controls.reason.clearValidators();
                    break;
            }
        });
    }

    updateClaim(partyID: string, claimID: ClaimID) {
        this.updateClaim$.next({ partyID, claimID, action: this.form.getRawValue().type });
    }

    private initForm() {
        return this.fb.group({
            type: ['', Validators.required],
            reason: ''
        });
    }
}
