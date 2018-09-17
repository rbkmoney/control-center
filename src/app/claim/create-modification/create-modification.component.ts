import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ActionType, UnitAction } from '../unit-action';
import { DomainModificationInfo, UnitContainerType } from '../model';
import { CreatableModificationName } from '../../party-modification-creation';
import { PartyModification } from '../../damsel/payment-processing';
import { PartyModificationCreationService } from '../../party-modification-creation/party-modification-creation.service';
import { Observable } from 'rxjs';
import { CreateTerminalParams } from '../../domain/domain-typed-manager';
import { toPartyModification } from '../../party-modification-creation/to-party-modification';
import { PartyTarget } from '../../party-modification-target';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'create-modification.component.html',
    providers: [PartyModificationCreationService]
})
export class CreateModificationComponent implements OnInit {

    isLoading = false;

    valid = false;

    partyId: string;

    values: PartyModification | CreateTerminalParams;

    name = CreatableModificationName;

    domainModificationInfo$: Observable<DomainModificationInfo>;
    unitID: string;

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public action: UnitAction,
        private snackBar: MatSnackBar,
        private createChangeService: PartyModificationCreationService,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.firstChild.params.subscribe((params) => {
            this.partyId = params.partyId;
        });
        this.domainModificationInfo$ = this.createChangeService.domainModificationInfo$;
    }

    valueChanges(e: any) {
        this.values = e;
    }

    unitIDChange(unitID: string) {
        this.unitID = unitID;
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
        this.cdr.detectChanges();
    }

    create() {
        this.isLoading = true;
        this.createChangeService.createChange(toPartyModification(this.action.modificationName, this.values, this.unitID), this.action).subscribe(() => {
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

    getPartyTarget(type: ActionType): PartyTarget {
        switch (type) {
            case ActionType.shopAction:
                return PartyTarget.shop;
            case ActionType.contractAction:
                return PartyTarget.contract;
        }
    }
}
