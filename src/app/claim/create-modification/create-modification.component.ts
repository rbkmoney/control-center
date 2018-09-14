import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ActionType, UnitAction } from '../unit-action';
import { DomainModificationInfo, UnitContainerType } from '../model';
import { CreatableModificationName } from '../../party-modification-creation';
import { PartyModification } from '../../damsel/payment-processing';
import { PartyModificationCreationService } from '../../party-modification-creation/party-modification-creation.service';
import { Observable } from 'rxjs';
import { CreateTerminalParams } from '../../domain/domain-typed-manager';

@Component({
    templateUrl: 'create-modification.component.html',
    providers: [PartyModificationCreationService]
})
export class CreateModificationComponent implements OnInit {

    isLoading = false;

    valid = false;

    values: PartyModification | CreateTerminalParams;

    name = CreatableModificationName;

    domainModificationInfo$: Observable<DomainModificationInfo>;

    constructor(
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public action: UnitAction,
        private snackBar: MatSnackBar,
        private createChangeService: PartyModificationCreationService) {
    }

    ngOnInit() {
        this.domainModificationInfo$ = this.createChangeService.domainModificationInfo$;
    }

    valueChanges(e: PartyModification | CreateTerminalParams) {
        this.values = e;
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
    }

    create() {
        this.isLoading = true;
        this.createChangeService.createChange(this.values, this.action).subscribe(() => {
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
