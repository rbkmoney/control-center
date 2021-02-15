import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppAuthGuardService, ClaimManagementRole } from '@cc/app/shared/services';

import { ClaimStatus as CMClaimStatus } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from './claim-status';
import { getAvailableClaimStatuses } from './get-available-claim-statuses';
import { StatusChangerDialogService } from './status-changer-dialog.service';

interface ActionsInterface {
    partyID: string;
    claimID: string;
    claimStatus: CMClaimStatus;
}

@Component({
    templateUrl: 'status-changer-dialog.component.html',
    providers: [StatusChangerDialogService],
    styleUrls: ['status-changer-dialog.component.scss'],
})
export class StatusChangerDialogComponent implements OnInit {
    statuses = getAvailableClaimStatuses(this.data.claimStatus).filter((status: ClaimStatus) =>
        this.statusFilter(status)
    );
    form = this.statusChangerDialogService.form;
    inProgress$ = this.statusChangerDialogService.inProgress$;

    constructor(
        private dialogRef: MatDialogRef<StatusChangerDialogComponent>,
        private statusChangerDialogService: StatusChangerDialogService,
        private appAuthGuardService: AppAuthGuardService,
        @Inject(MAT_DIALOG_DATA) private data: ActionsInterface
    ) {}

    ngOnInit(): void {
        this.statusChangerDialogService.statusChanged$.subscribe(() => this.dialogRef.close(true));
    }

    confirm(): void {
        this.statusChangerDialogService.updateClaim(this.data.partyID, this.data.claimID);
    }

    isReasonVisible(): boolean {
        const { type } = this.form.getRawValue();
        return type === ClaimStatus.denied || type === ClaimStatus.revoked;
    }

    private statusFilter(status: ClaimStatus): boolean {
        switch (status) {
            case ClaimStatus.accepted:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.AcceptClaim]);
            case ClaimStatus.denied:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.DenyClaim]);
            case ClaimStatus.review:
                return this.appAuthGuardService.userHasRoles([
                    ClaimManagementRole.RequestClaimReview,
                ]);
            case ClaimStatus.revoked:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.RevokeClaim]);
            case ClaimStatus.pending:
                return this.appAuthGuardService.userHasRoles([
                    ClaimManagementRole.RequestClaimChanges,
                ]);
            default:
                return false;
        }
    }
}
