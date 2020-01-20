import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { ActionType, ModificationAction } from '../modification-action';
import { ModificationGroupType } from '../model';
import { PartyTarget } from '../../party-modification-target';
import { ClaimService } from '../claim.service';
import {
    ContractModificationUnit,
    PartyModification,
    ShopModificationUnit
} from '../../gen-damsel/payment_processing';

export interface CreateModificationData {
    action: ModificationAction;
    unitID?: string;
    modification?: ShopModificationUnit | ContractModificationUnit;
}

enum Step {
    prepareTarget = '0',
    fillInModification = '1'
}

@Component({
    templateUrl: 'create-modification.component.html'
})
export class CreateModificationComponent implements OnInit {
    isLoading = false;
    valid = false;
    initialized = false;

    partyID: string;

    values: PartyModification;

    unitID: string;

    action: ModificationAction;

    currentStep = Step.prepareTarget;

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CreateModificationData,
        private claimService: ClaimService
    ) {}

    ngOnInit() {
        this.route.firstChild.params.subscribe(p => (this.partyID = p.party_id));
        if (this.data.unitID) {
            this.unitID = this.data.unitID;
            this.currentStep = Step.fillInModification;
        }
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

    getPartyTarget(type: ActionType): PartyTarget {
        switch (type) {
            case ActionType.shopAction:
                return PartyTarget.shop;
            case ActionType.contractAction:
                return PartyTarget.contract;
        }
    }

    private addChange() {
        this.claimService.addModification(this.values as PartyModification);
        this.dialogRef.close();
    }
}
