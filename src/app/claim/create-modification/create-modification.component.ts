import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ActionType, ModificationAction } from '../modification-action';
import { DomainModificationInfo, ModificationGroupType } from '../model';
import { PartyTarget } from '../../party-modification-target';
import { ClaimService } from '../claim.service';
import { CreateTerminalParams } from '../domain-typed-manager';
import { DomainTypedManager } from '../../thrift/domain-typed-manager';
import { PartyModification } from '../../gen-damsel/payment_processing';

@Component({
    templateUrl: 'create-modification.component.html'
})
export class CreateModificationComponent implements OnInit {

    isLoading = false;

    valid = new BehaviorSubject(false);

    partyId: string;

    values: PartyModification | CreateTerminalParams;

    unitID: string;

    domainModificationInfo$: Observable<DomainModificationInfo>;

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public action: ModificationAction,
        private snackBar: MatSnackBar,
        private claimService: ClaimService,
        private domainTypedManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.route.firstChild.params.subscribe((params) => {
            this.partyId = params.partyId;
        });
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
    }

    valueChanges(e: any) {
        this.values = e;
    }

    unitIDChange(unitID: string) {
        this.unitID = unitID;
    }

    statusChanges(status: string) {
        this.valid.next(status === 'VALID');
    }

    add() {
        switch (this.action.type) {
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
            .createTerminal(this.values as CreateTerminalParams)
            .subscribe(() => this.success(), (e) => this.failed(e));
    }

    private success() {
        this.isLoading = false;
        this.dialogRef.close();
        this.snackBar.open(`${name} created`, 'OK', {duration: 3000});
    }

    private failed(error) {
        console.error(error);
        this.isLoading = false;
        this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
    }
}
