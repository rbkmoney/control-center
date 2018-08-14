import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ActionType, ClaimAction } from '../claim-actions/claim-action';
import { CreateChangeService } from './create-change.service';
import { CreateLegalAgreementService } from './create-legal-agreement/create-legal-agreement.service';
import { CreateCategoryRefService } from './create-category-ref/create-category-ref.service';
import { CreateCurrencyRefService } from './create-currency-ref/create-currency-ref.service';
import { CreateContractTemplateService } from './create-contract-template/create-contract-template.service';
import { ContractModificationName, ShopModificationName } from '../model';

@Component({
    templateUrl: 'create-change.component.html',
    providers: [
        CreateChangeService,
        CreateLegalAgreementService,
        CreateCategoryRefService,
        CreateCurrencyRefService,
        CreateContractTemplateService
    ]
})
export class CreateChangeComponent {

    ActionType = ActionType;

    ContractModificationName = ContractModificationName;

    ShopModificationName = ShopModificationName;

    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<CreateChangeComponent>,
        @Inject(MAT_DIALOG_DATA) public claimAction: ClaimAction,
        private snackBar: MatSnackBar,
        private createChangeService: CreateChangeService) {
    }

    create() {
        const {name} = this.claimAction;
        this.isLoading = true;
        this.createChangeService.createChange(this.claimAction).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open(`${name} created`, 'OK', {duration: 3000});
        }, () => {
            this.isLoading = false;
            this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
        });
    }

    isFormValid() {
        return this.createChangeService.isFormValid(this.claimAction);
    }
}
