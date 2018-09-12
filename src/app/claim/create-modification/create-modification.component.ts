import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ActionType, UnitAction } from '../unit-action';
import { UnitContainerType } from '../model';
import { CreatableModificationName } from '../../party-modification-creation';
import { PartyModification } from '../../damsel/payment-processing';
import { CreateChangeService } from '../create-change/create-change.service';

@Component({
    templateUrl: 'create-modification.component.html',
    providers: [CreateChangeService]
})
export class CreateModificationComponent {

    isLoading = false;

    valid = false;

    modification: PartyModification;

    name = CreatableModificationName;

    constructor(
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public action: UnitAction,
        private snackBar: MatSnackBar,
        private createChangeService: CreateChangeService) {
    }

    valueChanges(e: PartyModification) {
        this.modification = e;
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
    }

    create() {
        this.isLoading = true;
        this.createChangeService.createChange(this.modification, this.action).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open(`${name} created`, 'OK', {duration: 3000});
        }, (error) => {
            console.error(error);
            this.isLoading = false;
            this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
        });
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
