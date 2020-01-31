import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';

import { ActionType, ModificationAction } from './modification-action';
import {
    ClaimID,
    PartyModification
} from '../../../thrift-services/damsel/gen-model/claim_management';
import { ModificationGroupType } from '../../../claim/model';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { ClaimService } from '../claim.service';

export interface CreateModificationData {
    action: ModificationAction;
    claimID: ClaimID;
    partyID: string;
}

@Component({
    templateUrl: 'create-modification.component.html'
})
export class CreateModificationComponent implements OnInit {
    isLoading = false;
    valid = false;
    initialized = false;

    values: PartyModification;

    action: ModificationAction;

    constructor(
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CreateModificationData,
        private claimManagementService: ClaimManagementService,
        private claimService: ClaimService
    ) {}

    ngOnInit() {
        this.action = this.data.action;
        this.initialized = true;
    }

    valueChanges(e: any) {
        this.values = e;
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
    }

    apply() {
        switch (this.data.action.type) {
            case ActionType.shopAction:
            case ActionType.contractAction:
                this.addChange();
                break;
        }
    }

    getContainerType(type: ActionType): string {
        switch (type) {
            case ActionType.shopAction:
                return ModificationGroupType.ShopUnitContainer;
            case ActionType.contractAction:
                return ModificationGroupType.ContractUnitContainer;
        }
    }

    private addChange() {
        this.isLoading = true;
        this.claimManagementService
            .updateClaim(this.data.partyID, this.data.claimID, [
                { party_modification: this.values }
            ])
            .subscribe(
                _ => {
                    this.isLoading = false;
                    this.claimService.getClaim(this.data.partyID, this.data.claimID);
                    this.dialogRef.close(true);
                },
                e => {
                    this.isLoading = false;
                    console.error(e);
                }
            );
    }
}
