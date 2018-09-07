import { Component } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';

import { ContractModificationName, ShopModificationName } from '../model';
import { ActionType, UnitAction } from '../unit-action';
import { CreateChangeComponent } from '../create-change/create-change.component';
import { CreateModificationComponent } from '../create-modification/create-modification.component';

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
            name: ContractModificationName.legalAgreementBinding
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.reportPreferencesModification
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.adjustmentModification
        }
    ];

    shopActions: UnitAction[] = [
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
        // this.dialog.open<CreateChangeComponent>(CreateChangeComponent, config);
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }
}
