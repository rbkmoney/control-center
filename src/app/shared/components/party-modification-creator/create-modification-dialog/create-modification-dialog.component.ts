import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { prepareModificationsToBackend } from '@cc/app/shared/components/party-modification-creator/create-modification-dialog/prepare-modifications-to-backend';

import {
    ContractModificationUnit,
    ContractorModificationUnit,
    Modification,
    PartyModification,
    ShopModificationUnit,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ActionType, ModificationAction, ModificationGroupType } from '../model';
import { PartyModificationEmitter } from '../party-modification-emitter.service';
import { PartyTarget } from '../party-modification-target';

export interface CreateModificationData {
    action: ModificationAction;
    partyID: string;
    unitID?: string;
    modification?: ShopModificationUnit | ContractModificationUnit | ContractorModificationUnit;
    fromClaim: Modification[];
}

enum Step {
    PrepareTarget = '0',
    FillInModification = '1',
}

@Component({
    templateUrl: 'create-modification-dialog.component.html',
})
export class CreateModificationDialogComponent implements OnInit {
    isLoading = false;
    valid = false;
    initialized = false;

    partyID: string;

    values: PartyModification;

    unitID: string;

    action: ModificationAction;

    currentStep = Step.PrepareTarget;

    fromClaim: Modification[];

    constructor(
        private dialogRef: MatDialogRef<CreateModificationDialogComponent>,
        private partyModificationEmitter: PartyModificationEmitter,
        @Inject(MAT_DIALOG_DATA) public data: CreateModificationData
    ) {}

    ngOnInit() {
        if (this.data.unitID) {
            this.unitID = this.data.unitID;
            this.currentStep = Step.FillInModification;
        }
        this.partyID = this.data.partyID;
        this.action = this.data.action;
        this.fromClaim = this.data.fromClaim;
        this.initialized = true;
    }

    valueChanges(e: any) {
        this.values = e;
    }

    unitIDChange(unitID: string) {
        this.unitID = unitID;
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
    }

    apply() {
        switch (this.data.action.type) {
            case ActionType.ShopAction:
            case ActionType.ContractAction:
            case ActionType.ContractorAction:
                this.addChange();
                break;
        }
    }

    getContainerType(type: ActionType): string {
        switch (type) {
            case ActionType.ShopAction:
                return ModificationGroupType.ShopUnitContainer;
            case ActionType.ContractAction:
                return ModificationGroupType.ContractUnitContainer;
            case ActionType.ContractorAction:
                return ModificationGroupType.ContractorUnitContainer;
        }
    }

    getPartyTarget(type: ActionType): PartyTarget {
        switch (type) {
            case ActionType.ShopAction:
                return PartyTarget.Shop;
            case ActionType.ContractAction:
                return PartyTarget.Contract;
            case ActionType.ContractorAction:
                return PartyTarget.Contractor;
        }
    }

    private addChange() {
        this.partyModificationEmitter.modificationCreated(
            prepareModificationsToBackend(this.values)
        );
        this.dialogRef.close();
    }
}
