import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { CreateChangeComponent } from '../create-change/create-change.component';
import { ActionType, UnitAction } from '../unit-action';
import { UnitContainerType } from '../model';
import { CreatableModificationName } from '../../party-modification-creation';
import { PartyModification } from '../../damsel/payment-processing';

@Component({
    templateUrl: 'create-modification.component.html'
})
export class CreateModificationComponent {

    isLoading = false;

    valid = false;

    name = CreatableModificationName;

    unitID: string;

    constructor(
        private dialogRef: MatDialogRef<CreateChangeComponent>,
        @Inject(MAT_DIALOG_DATA) public action: UnitAction,
        private snackBar: MatSnackBar) {
    }

    unitIDChange(unitID: string) {
        this.unitID = unitID;
    }

    valueChanges(e: PartyModification) {
        // console.log(e);
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
    }

    getContainerType(type: ActionType): string {
        switch (type) {
            case ActionType.shopAction:
                return UnitContainerType.ShopUnitContainer;
            case ActionType.contractAction:
                return UnitContainerType.ContractUnitContainer;
            case ActionType.domainAction:
                return 'Domain modification';
        }
    }
}
