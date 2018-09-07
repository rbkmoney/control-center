import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { CreateChangeComponent } from '../create-change/create-change.component';
import { ActionType, UnitAction } from '../unit-action';
import { UnitContainerType } from '../model';
import { PartyModificationEvent, CreatableModificationName } from '../../party-modification-creation';

@Component({
    templateUrl: 'create-modification.component.html'
})
export class CreateModificationComponent {

    isLoading = false;

    valid = false;

    name = CreatableModificationName;

    constructor(
        private dialogRef: MatDialogRef<CreateChangeComponent>,
        @Inject(MAT_DIALOG_DATA) public action: UnitAction,
        private snackBar: MatSnackBar) {
    }

    valueChange(e: PartyModificationEvent) {
        this.valid = e.valid;
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
