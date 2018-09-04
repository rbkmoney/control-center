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
import {
    ContractModificationName,
    DomainModificationInfo,
    ShopModificationName,
    PartyModificationContainerType
} from '../model';
import { CreateShopService } from './create-shop/create-shop.service';
import { CreateLocationService } from './create-location/create-location.service';
import { CreateDetailsService } from './create-details/create-details.service';
import { CreateContractService } from './create-contract/create-contract.service';
import { RussianLegalEntityFormService } from './create-contract/legal-entity-form/russian-legal-entity-form/russian-legal-entity-form.service';
import {
    RussianBankAccountFormService
} from './create-contract/legal-entity-form/russian-legal-entity-form/russian-bank-account-form/russian-bank-account-form.service';

export interface CreateChangeComponentInterface {
    action: UnitAction;
    unitID?: string;
}

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
        CreateShopService,
        CreateContractService,
        CreateLocationService,
        CreateDetailsService,
        RussianLegalEntityFormService,
        RussianBankAccountFormService
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
        @Inject(MAT_DIALOG_DATA) public data: CreateChangeComponentInterface,
        private snackBar: MatSnackBar,
        private createChangeService: CreateChangeService) {
    }

    ngOnInit() {
        this.domainModificationInfo$ = this.createChangeService.domainModificationInfo$;
    }

    create() {
        const {name} = this.data.action;
        this.isLoading = true;
        this.createChangeService.createChange(this.data.action, this.data.unitID).subscribe(() => {
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
        return this.createChangeService.isFormValid(this.data.action);
    }

    getContainerType(type: ActionType): string {
        switch (type) {
            case ActionType.shopAction:
                return PartyModificationContainerType.ShopModification;
            case ActionType.contractAction:
                return PartyModificationContainerType.ContractModification;
            case ActionType.domainAction:
                return 'Domain modification';
        }
    }
}
