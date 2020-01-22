import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ActionsService } from './actions.service';
import { ClaimID, ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { Actions } from './actions';
import { getAvailableClaimActions } from './get-available-claim-actions';

interface ActionsInterface {
    partyID: string;
    claimID: ClaimID;
    claimStatus: ClaimStatus
}

@Component({
    templateUrl: 'actions.component.html',
    providers: [ActionsService],
    styleUrls: ['actions.component.scss']
})
export class ActionsComponent {
    actions = getAvailableClaimActions(this.data.claimStatus);

    form = this.actionsService.form;
    isLoading$ = this.actionsService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<ActionsComponent>,
        private actionsService: ActionsService,
        @Inject(MAT_DIALOG_DATA) private data: ActionsInterface
    ) {
    }

    confirm() {
        this.actionsService.updateClaim(this.data.partyID, this.data.claimID);
    }

    isReasonVisible(): boolean {
        const { type } = this.form.getRawValue();
        return type === Actions.denied || type === Actions.revoked;
    }
}
