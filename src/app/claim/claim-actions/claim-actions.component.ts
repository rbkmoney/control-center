import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';

import {
    ShopModificationName,
    ContractModificationName,
    PartyModificationUnitType
} from '../model';
import { ActionType, ClaimAction } from './claim-action';
import { CreateChangeComponent, CreateChangeComponentInterface } from '../create-change/create-change.component';

export interface ClaimActionsComponentInterface {
    unitID: string;
    type: PartyModificationUnitType;
}

@Component({
    templateUrl: 'claim-actions.component.html'
})
export class ClaimActionsComponent {

    constructor(private bottomSheetRef: MatBottomSheetRef,
                private dialog: MatDialog,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: ClaimActionsComponentInterface) {
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
        }
    ];

    shopActions: ClaimAction[] = [
        // {
        //     type: ActionType.shopAction,
        //     name: ShopModificationName.creation
        // },
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

    domainActions: ClaimAction[] = [
        {
            type: ActionType.domainAction
        }
    ];

    select(action: ClaimAction) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: {action, unitID: this.data.unitID},
            width: '720px',
            disableClose: true
        };
        this.dialog.open<CreateChangeComponent, CreateChangeComponentInterface>(CreateChangeComponent, config);
    }
}
