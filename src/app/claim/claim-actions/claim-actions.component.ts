import { Component } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';

import { ShopModificationName, ContractModificationName } from '../model';
import { ActionType, ClaimAction } from './claim-action';
import { CreateChangeComponent } from '../create-change/create-change.component';

@Component({
    templateUrl: 'claim-actions.component.html'
})
export class ClaimActionsComponent {

    constructor(private bottomSheetRef: MatBottomSheetRef,
                private dialog: MatDialog) {
    }

    contractActions: ClaimAction[] = [
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
    ];

    shopActions: ClaimAction[] = [
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

    domainActions: ClaimAction[] = [
        {
            type: ActionType.domainAction
        }
    ];

    select(action: ClaimAction) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: action,
            minWidth: '60vw',
            maxWidth: '80vw',
            disableClose: true
        };
        this.dialog.open<CreateChangeComponent, ClaimAction>(CreateChangeComponent, config);
    }
}
