import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';

import { ActionType, ModificationAction } from '../modification-action';
import { CreateModificationComponent } from '../create-modification/create-modification.component';
import { ContractModificationName, ShopModificationName } from '../model';

@Component({
    templateUrl: 'unit-actions.component.html'
})
export class UnitActionsComponent {

    constructor(private bottomSheetRef: MatBottomSheetRef,
                private dialog: MatDialog,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    }

    contractActions: ModificationAction[] = [
        {
            type: ActionType.contractAction,
            name: ContractModificationName.creation
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.legalAgreementBinding
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.reportPreferencesModification
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.adjustmentModification
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.payoutToolModification
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.termination
        },
        // {
        //     type: ActionType.contractAction,
        //     name: ContractModificationName.contractorModification
        // }
    ];

    shopActions: ModificationAction[] = [
        {
            type: ActionType.shopAction,
            name: ShopModificationName.creation
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.detailsModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.locationModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.categoryModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.shopAccountCreation
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.payoutScheduleModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.payoutToolModification
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.contractModification
        }
    ];

    domainActions: ModificationAction[] = [
        {
            type: ActionType.domainAction
        }
    ];

    select(action: ModificationAction) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: action,
            width: '800px',
            disableClose: true
        };
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }
}
