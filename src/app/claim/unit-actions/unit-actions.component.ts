import { Component } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';

import { ContractModificationName, ShopModificationName } from '../model';
import { ActionType, UnitAction } from '../unit-action';
import { CreateModificationComponent } from '../create-modification/create-modification.component';
import { CreatableModificationName } from '../../party-modification-creation';

@Component({
    templateUrl: 'unit-actions.component.html'
})
export class UnitActionsComponent {

    constructor(private bottomSheetRef: MatBottomSheetRef,
                private dialog: MatDialog) {
    }

    contractActions: UnitAction[] = [
        {
            type: ActionType.contractAction,
            name: CreatableModificationName.ContractLegalAgreementBinding
        },
        {
            type: ActionType.contractAction,
            name: CreatableModificationName.ContractReportPreferencesModification
        },
        {
            type: ActionType.contractAction,
            name: CreatableModificationName.ContractAdjustmentModification
        },
        {
            type: ActionType.contractAction,
            name: CreatableModificationName.ContractPayoutToolModification
        }
    ];

    shopActions: UnitAction[] = [
        {
            type: ActionType.shopAction,
            name: CreatableModificationName.ShopDetailsModification
        },
        {
            type: ActionType.shopAction,
            name: CreatableModificationName.ShopLocationModification
        },
        {
            type: ActionType.shopAction,
            name: CreatableModificationName.ShopCategoryModification
        },
        {
            type: ActionType.shopAction,
            name: CreatableModificationName.ShopAccountCreation
        },
        {
            type: ActionType.shopAction,
            name: CreatableModificationName.ShopScheduleModification
        }
    ];

    domainActions: UnitAction[] = [
        {
            type: ActionType.domainAction
        }
    ];

    select(action: UnitAction) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: action,
            width: '720px',
            disableClose: true
        };
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }
}
