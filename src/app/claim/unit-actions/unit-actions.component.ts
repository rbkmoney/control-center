import { Component } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { ActionType, UnitAction } from '../unit-action';
import { CreateModificationComponent } from '../create-modification/create-modification.component';
import { CreatableModificationName } from '../../party-modification-creation';
import { ContractModificationName, ShopModificationName } from '../model';

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
            name: ContractModificationName.legalAgreementBinding,
            modificationName: CreatableModificationName.ContractLegalAgreementBinding
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.reportPreferencesModification,
            modificationName: CreatableModificationName.ContractReportPreferencesModification
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.adjustmentModification,
            modificationName: CreatableModificationName.ContractAdjustmentModification
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.payoutToolModification,
            modificationName: CreatableModificationName.ContractPayoutToolModification
        }
    ];

    shopActions: UnitAction[] = [
        {
            type: ActionType.shopAction,
            name: ShopModificationName.detailsModification,
            modificationName: CreatableModificationName.ShopDetailsModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.locationModification,
            modificationName: CreatableModificationName.ShopLocationModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.categoryModification,
            modificationName: CreatableModificationName.ShopCategoryModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.shopAccountCreation,
            modificationName: CreatableModificationName.ShopAccountCreation
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.payoutScheduleModification,
            modificationName: CreatableModificationName.ShopScheduleModification
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
            width: '800px',
            disableClose: true
        };
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }
}
