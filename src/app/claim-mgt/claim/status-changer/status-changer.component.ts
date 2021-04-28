import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppAuthGuardService, ClaimManagementRole } from '@cc/app/shared/services';

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
    styleUrls: ['status-changer.component.scss'],
})
export class StatusChangerComponent implements OnInit {
    actions = getAvailableClaimStatuses(this.data.claimStatus).filter((status: ClaimStatuses) =>
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

    ngOnInit(): void {
        this.actionsService.claim$.subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    confirm(): void {
        this.actionsService.updateClaim(this.data.partyID, this.data.claimID);
    }

    isReasonVisible(): boolean {
        const { type } = this.form.getRawValue();
        return type === ClaimStatuses.denied || type === ClaimStatuses.revoked;
    }

    private statusFilter(status: ClaimStatuses): boolean {
        switch (status) {
            case ClaimStatuses.accepted:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.AcceptClaim]);
            case ClaimStatuses.denied:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.DenyClaim]);
            case ClaimStatuses.review:
                return this.appAuthGuardService.userHasRoles([
                    ClaimManagementRole.RequestClaimReview,
                ]);
            case ClaimStatuses.revoked:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.RevokeClaim]);
            case ClaimStatuses.pending:
                return this.appAuthGuardService.userHasRoles([
                    ClaimManagementRole.RequestClaimChanges,
                ]);
            default:
                return false;
        }
    }
}
