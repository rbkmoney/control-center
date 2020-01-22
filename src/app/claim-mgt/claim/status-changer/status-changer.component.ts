import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StatusChangerService } from './status-changer.service';
import { ClaimID, ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { Statuses } from './statuses';
import { getAvailableClaimStatuses } from './get-available-claim-statuses';

interface ActionsInterface {
    partyID: string;
    claimID: ClaimID;
    claimStatus: ClaimStatus
}

@Component({
    templateUrl: 'status-changer.component.html',
    providers: [StatusChangerService],
    styleUrls: ['status-changer.component.scss']
})
export class StatusChangerComponent {
    actions = getAvailableClaimStatuses(this.data.claimStatus);

    form = this.actionsService.form;
    isLoading$ = this.actionsService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<StatusChangerComponent>,
        private actionsService: StatusChangerService,
        @Inject(MAT_DIALOG_DATA) private data: ActionsInterface
    ) {
    }

    confirm() {
        this.actionsService.updateClaim(this.data.partyID, this.data.claimID);
    }

    isReasonVisible(): boolean {
        const { type } = this.form.getRawValue();
        return type === Statuses.denied || type === Statuses.revoked;
    }
}
