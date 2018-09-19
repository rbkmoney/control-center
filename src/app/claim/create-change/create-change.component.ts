import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { ActionType, UnitAction } from '../unit-action';
import { CreateChangeService } from './create-change.service';
import { CreateLegalAgreementService } from './create-legal-agreement/create-legal-agreement.service';
import { CreateCategoryRefService } from './create-category-ref/create-category-ref.service';
import { CreateCurrencyRefService } from './create-currency-ref/create-currency-ref.service';
import { CreateContractTemplateService } from './create-contract-template/create-contract-template.service';
import { CreateBusinessScheduleRefService } from './create-business-schedule-ref/create-business-schedule-ref.service';
import { CreateServiceAcceptanceActPreferencesService } from './create-service-acceptance-act-preferences/create-service-acceptance-act-preferences.service';
import { CreateTerminalObjectService } from './create-terminal-object/create-terminal-object.service';
import { ContractModificationName, DomainModificationInfo, ShopModificationName, UnitContainerType } from '../model';
import { CreateLocationService } from './create-location/create-location.service';
import { CreateDetailsService } from './create-details/create-details.service';
import { DomainTypedManager } from '../domain-typed-manager';

@Component({
    templateUrl: 'create-change.component.html',
    providers: [
        CreateChangeService,
        CreateLegalAgreementService,
        CreateCategoryRefService,
        CreateCurrencyRefService,
        CreateContractTemplateService,
        CreateBusinessScheduleRefService,
        CreateServiceAcceptanceActPreferencesService,
        CreateTerminalObjectService,
        CreateLocationService,
        CreateDetailsService,
        DomainTypedManager
    ]
})
export class CreateChangeComponent implements OnInit {

    ActionType = ActionType;

    ContractModificationName = ContractModificationName;

    ShopModificationName = ShopModificationName;

    isLoading = false;

    domainModificationInfo$: Observable<DomainModificationInfo>;

    constructor(
        private dialogRef: MatDialogRef<CreateChangeComponent>,
        @Inject(MAT_DIALOG_DATA) public action: UnitAction,
        private snackBar: MatSnackBar,
        private createChangeService: CreateChangeService) {
    }

    ngOnInit() {
        this.domainModificationInfo$ = this.createChangeService.domainModificationInfo$;
    }

    create() {
        const {name} = this.action;
        this.isLoading = true;
        this.createChangeService.createChange(this.action).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open(`${name} created`, 'OK', {duration: 3000});
        }, (error) => {
            console.error(error);
            this.isLoading = false;
            this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
        });
    }

    isFormValid() {
        return this.createChangeService.isFormValid(this.action);
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
