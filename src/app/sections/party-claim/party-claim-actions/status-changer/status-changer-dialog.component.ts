import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppAuthGuardService, ClaimManagementRole } from '@cc/app/shared/services';

import { ClaimStatus } from '../../../../papi/model';
import { ClaimStatus as CMClaimStatus } from '../../../../thrift-services/damsel/gen-model/claim_management';
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
    statuses = getAvailableClaimStatuses(this.data.claimStatus).filter((status) =>
        this.statusFilter(status)
    );
    form = this.statusChangerDialogService.form;
    inProgress$ = this.statusChangerDialogService.inProgress$;

    // It's necessary to hardcode reasons (backend issue)
    revokeReasons = [
        'Длительное ожидание подключения',
        'Не устраивает комиссия',
        'Большой пакет документов',
        'Не подходит продукт',
        'Нет сплитов',
    ];

    // eslint-disable-next-line @typescript-eslint/naming-convention
    ClaimStatus = ClaimStatus;

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

    isStatus(status: ClaimStatus): boolean {
        const { type } = this.form.getRawValue();
        return status === type;
    }

    private statusFilter(status: ClaimStatus): boolean {
        switch (status) {
            case ClaimStatus.Accepted:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.AcceptClaim]);
            case ClaimStatus.Denied:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.DenyClaim]);
            case ClaimStatus.Review:
                return this.appAuthGuardService.userHasRoles([
                    ClaimManagementRole.RequestClaimReview,
                ]);
            case ClaimStatus.Revoked:
                return this.appAuthGuardService.userHasRoles([ClaimManagementRole.RevokeClaim]);
            case ClaimStatus.Pending:
                return this.appAuthGuardService.userHasRoles([
                    ClaimManagementRole.RequestClaimChanges,
                ]);
            default:
                return false;
        }
    }
}
