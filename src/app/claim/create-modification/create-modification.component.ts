import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionType, ModificationAction } from '../modification-action';
import { DomainModificationInfo, ModificationGroupType } from '../model';
import { PartyTarget } from '../../party-modification-target';
import { ClaimService } from '../claim.service';
import { DomainTypedManager, AppendTerminalToProviderParams } from '../../thrift';
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

    values: PartyModification | AppendTerminalToProviderParams;

    unitID: string;

    domainModificationInfo$: Observable<DomainModificationInfo>;

    action: ModificationAction;

    currentStep = Step.prepareTarget;

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CreateModificationData,
        private snackBar: MatSnackBar,
        private claimService: ClaimService,
        private domainTypedManager: DomainTypedManager
    ) {}

    ngOnInit() {
        this.route.firstChild.params.subscribe(p => (this.partyID = p.partyId));
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
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
            case ActionType.domainAction:
                this.createTerminal();
                break;
        }
    }

    getContainerType(type: ActionType): string {
        switch (type) {
            case ActionType.shopAction:
                return ModificationGroupType.ShopUnitContainer;
            case ActionType.contractAction:
                return ModificationGroupType.ContractUnitContainer;
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

    private addChange() {
        this.claimService.addModification(this.values as PartyModification);
        this.dialogRef.close();
    }

    private createTerminal() {
        this.isLoading = true;
        this.domainTypedManager
            .appendTerminalToProvider(this.values as AppendTerminalToProviderParams)
            .subscribe(() => this.success(), e => this.failed(e));
    }

    private success() {
        this.isLoading = false;
        this.dialogRef.close();
        this.snackBar.open(`${name} created`, 'OK', { duration: 3000 });
    }

    private failed(error) {
        console.error(error);
        this.isLoading = false;
        this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
    }
}
