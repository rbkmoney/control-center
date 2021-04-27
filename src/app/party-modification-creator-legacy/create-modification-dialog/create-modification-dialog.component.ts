import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
    ContractModificationUnit,
    ContractorModificationUnit,
    PartyModification,
    ShopModificationUnit,
} from '../../thrift-services/damsel/gen-model/claim_management';
import { ActionType, ModificationAction, ModificationGroupType } from '../model';
import { PartyModificationEmitter } from '../party-modification-emitter.service';
import { PartyTarget } from '../party-modification-target';

export interface CreateModificationData {
    action: ModificationAction;
    partyID: string;
    unitID?: string;
    modification?: ShopModificationUnit | ContractModificationUnit | ContractorModificationUnit;
}

enum Step {
    prepareTarget = '0',
    fillInModification = '1',
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

    currentStep = Step.prepareTarget;

    constructor(
        private dialogRef: MatDialogRef<CreateModificationDialogComponent>,
        private partyModificationEmitter: PartyModificationEmitter,
        @Inject(MAT_DIALOG_DATA) public data: CreateModificationData
    ) {}

    ngOnInit() {
        if (this.data.unitID) {
            this.unitID = this.data.unitID;
            this.currentStep = Step.fillInModification;
        }
        this.partyID = this.data.partyID;
        this.action = this.data.action;
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
                return PartyTarget.shop;
            case ActionType.ContractAction:
                return PartyTarget.contract;
            case ActionType.ContractorAction:
                return PartyTarget.contractor;
        }
    }

    private addChange() {
        this.partyModificationEmitter.modificationCreated(this.values);
        this.dialogRef.close();
    }
}
