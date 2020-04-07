import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { ClaimID, ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatuses } from '../claim-statuses';
import { getAvailableClaimStatuses } from './get-available-claim-statuses';
import { StatusChangerService } from './status-changer.service';

interface ActionsInterface {
    partyID: string;
    claimID: ClaimID;
    claimStatus: ClaimStatus;
}

@Component({
    templateUrl: 'status-changer.component.html',
    providers: [StatusChangerService],
    styleUrls: ['status-changer.component.scss']
})
export class StatusChangerComponent implements OnInit {
    actions = getAvailableClaimStatuses(this.data.claimStatus).filter((status) =>
        this.statusFilter(status)
    );
    form = this.actionsService.form;
    isLoading$ = this.actionsService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<StatusChangerComponent>,
        private actionsService: StatusChangerService,
        private appAuthGuardService: AppAuthGuardService,
        @Inject(MAT_DIALOG_DATA) private data: ActionsInterface
    ) {}

    confirm() {
        this.actionsService.updateClaim(this.data.partyID, this.data.claimID);
    }

    isReasonVisible(): boolean {
        const { type } = this.form.getRawValue();
        return type === ClaimStatuses.denied || type === ClaimStatuses.revoked;
    }

    ngOnInit(): void {
        this.actionsService.claim$.subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    private statusFilter(status: ClaimStatuses): boolean {
        switch (status) {
            case ClaimStatuses.accepted:
                return this.appAuthGuardService.userHasRoles(['accept_claim']);
            case ClaimStatuses.denied:
                return this.appAuthGuardService.userHasRoles(['deny_claim']);
            case ClaimStatuses.review:
                return this.appAuthGuardService.userHasRoles(['request_claim_review']);
            case ClaimStatuses.revoked:
                return this.appAuthGuardService.userHasRoles(['revoke_claim']);
            case ClaimStatuses.pending:
                return this.appAuthGuardService.userHasRoles(['request_claim_changes']);
            default:
                return false;
        }
    }
}
